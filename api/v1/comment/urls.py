from django.urls import path
from . import views

urlpatterns = [
    path('', views.CommentApi.as_view()),
    path('<int:pk>', views.CommentRetrieveUpdateDestroyAPI.as_view())
]
