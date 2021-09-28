from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from social.models import Tag
from .serializer import TagSerializer


class TagList(ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class TagDetail(RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
