from django.shortcuts import render
from django.views.generic import ListView, DetailView, FormView
from .models import Post


# Create your views here.

class PostListView(ListView):
    model = Post
    template_name = 'home.html'
