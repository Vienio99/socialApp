from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('user/', include('api.v1.user.urls')),
    path('post/', include('api.v1.post.urls')),
    path('comment/', include('api.v1.comment.urls'))
]