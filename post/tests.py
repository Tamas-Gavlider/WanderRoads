from django.contrib.auth.models import User
from .models import Post
from rest_framework import status
from rest_framework.test import APITestCase

# Create your tests here.


class PostListViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username='tamas', password='password')

    def test_can_list_posts(self):
        tamas = User.objects.get(username='tamas')
        Post.objects.create(owner=tamas, title='test title', country='SK')
        response = self.client.get('/post/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_can_create_post(self):
        self.client.login(username='tamas', password='password')
        response = self.client.post('/post/',
                                    {'title': 'test title', 'country': 'SK'})
        count = Post.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_not_logged_in_cant_create_post(self):
        response = self.client.post('/post/', {'title': 'test title'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class PostDetailViewTests(APITestCase):
    def setUp(self):
        paul = User.objects.create_user(username='paul', password='password')
        peter = User.objects.create_user(username='peter123',
                                         password='password')
        Post.objects.create(owner=paul, title='test title', country='SK')
        Post.objects.create(owner=peter, title='test title', country='SK')

    def test_can_retrieve_post_using_valid_id(self):
        response = self.client.get('/post/1/')
        self.assertEqual(response.data['title'], 'test title')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_retrieve_post_using_invalid_id(self):
        response = self.client.get('/post/3/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_can_update_own_post(self):
        self.client.login(username='paul', password='password')
        response = self.client.put('/post/1/',
                                   {'title': 'a new title', 'country': 'SK'})
        post = Post.objects.filter(pk=1).first()
        self.assertEqual(post.title, 'a new title')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cant_update_another_users_post(self):
        self.client.login(username='paul', password='password')
        response = self.client.put('/post/2/',
                                   {'title': 'a new title', 'country': 'SK'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
