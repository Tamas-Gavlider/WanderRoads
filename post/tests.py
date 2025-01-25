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
        Post.objects.create(owner= tamas,title='test title')
        response = self.client.get('/post/')
        self.assertEqual(response.status_code, status.HTTP_200_OK )
        
    def test_logged_in_user_can_create_post(self):
        self.client.login(username='tamas', password='password')
        response = self.client.post('/post/',{'title':'test title'})
        count = Post.objects.count()
        self.assertEqual(count,1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_user_not_logged_in_cant_create_post(self):
        response = self.client.post('/post/', {'title': 'test title'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)