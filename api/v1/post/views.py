from rest_framework import permissions
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from social.models import Post
from api.permissions import IsOwnerOrReadOnly
from .serializer import PostSerializer


class IsOwnerOrLikeOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it (unless it's "likes" field -
                                                                            any authenticated user can like post)
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Check for all the conditions to like post
        try:
            if bool(request.method == 'PATCH'
                    and request.user
                    and request.user.is_authenticated
                    and len(request.data) == 1 and request.data['likes']):
                return True
        except KeyError:
            pass

        # Instance must have an attribute named `owner`.
        return obj.author == request.user


class PostList(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class PostDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = (IsOwnerOrLikeOnly,)

    def get_queryset(self):
        return Post.objects.filter(id=self.kwargs.get('pk', None))

    # def get_serializer_class(self):
    #     print(self.get_object().author)
    #     print(self.request.method)
    #     if self.request.user == self.get_object().author:  # check if is author
    #         print('ok')
    #         return PostSerializer
    #     print('not ok')
    #     return LikeSerializer
