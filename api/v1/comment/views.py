from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny

from social.models import Comment
from .serializer import CommentSerializer


class CommentApi(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (AllowAny, )
