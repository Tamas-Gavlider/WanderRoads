from django.contrib.auth.models import User
from .models import Post
from rest_framework import status
from rest_framework.test import APITestCase


class PostListViewTests(APITestCase):
    def setUp(self):
        User.objects.create_user(username='test', password='pass')

    def test_can_list_posts(self):
        test = User.objects.get(username='test')
        Post.objects.create(owner=test, title='a title')
        response = self.client.get('api/posts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_can_create_post(self):
        self.client.login(username='test', password='pass')
        response = self.client.post('/api/posts/', {'title': 'a title',
                                    'country': 'US', 'content': 'content'})
        count = Post.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_not_logged_in_cant_create_post(self):
        response = self.client.post('/api/posts/', {'title': 'a title',
                                    'country': 'US', 'content': 'content'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class PostDetailViewTests(APITestCase):
    def setUp(self):
        self.user_1 = User.objects.create_user(username='user_1',
                                               password='pass')
        self.user_2 = User.objects.create_user(username='user_2',
                                               password='pass')
        self.post_1 = Post.objects.create(
            owner=self.user_1, title='a title', content='user 1 content',
            country='FR'
        )
        self.post_2 = Post.objects.create(
            owner=self.user_2, title='another title',
            content='another content', country='IT'
        )

    def test_can_retrieve_post(self):
        response = self.client.get(f'api/posts/{self.post_1.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_can_update_own_post(self):
        self.client.login(username='user_1', password='pass')
        response = self.client.put(f'/api/posts/{self.post_1.id}/',
                                   {'title': 'a new title', 'country': 'IT',
                                    'content': 'content'})
        post = Post.objects.get(pk=self.post_1.id)
        self.assertEqual(post.title, 'a new title')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cant_update_another_users_post(self):
        self.client.login(username='user_2', password='pass')
        response = self.client.put(f'/api/posts/{self.post_1.id}/',
                                   {'title': 'another title', 'country': 'US',
                                    'content': ' test content'})
        post = Post.objects.get(pk=self.post_1.id)
        self.assertNotEqual(post.title, 'another title')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
