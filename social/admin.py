from django.contrib import admin

# Register your models here.
from social.models import Post, Comment


class PostAdmin(admin.ModelAdmin):
    list_display = all


class CommentAdmin(admin.ModelAdmin):
    list_display = all


admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
