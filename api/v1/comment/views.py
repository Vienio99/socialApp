from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny

from social.models import Comment
from .serializer import CommentSerializer


class CommentApi(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (AllowAny,)


class CommentRetrieveUpdateDestroyAPI(RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.objects.filter(id=self.kwargs.get('pk', None))
