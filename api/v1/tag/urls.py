from django.urls import path
from . import views

urlpatterns = [
    path('', views.TagList.as_view()),
    path('<id:pk>', views.TagDetail.as_view())
]
