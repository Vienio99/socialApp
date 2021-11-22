from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from social.models import Post
from api.permissions import IsOwnerOrLikeOnlyOrReadOnly
from .serializer import PostSerializer


class PostList(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class PostDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = (IsOwnerOrLikeOnlyOrReadOnly,)

    def get_queryset(self):
        return Post.objects.filter(id=self.kwargs.get('pk', None))
