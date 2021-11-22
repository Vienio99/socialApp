from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from social.models import Comment
from .serializer import CommentSerializer
from ...permissions import IsOwnerOrLikeOnlyOrReadOnly


class CommentList(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class CommentDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsOwnerOrLikeOnlyOrReadOnly,)

    def get_queryset(self):
        return Comment.objects.filter(id=self.kwargs.get('pk', None))
