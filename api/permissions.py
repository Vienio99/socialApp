from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have an attribute named `owner`.
        return obj.author == request.user


class IsOwnerOrLikeOnlyOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it (unless it's "likes" field -
                                                                            any authenticated user can like a post)
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