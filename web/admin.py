from django.contrib import admin

from web.helpers import preview_image
from web.models import Game, Genre, Image, Platform, Score

admin.site.site_header = "iGrodno administration"
admin.site.site_title = "iGrodno Admin Portal"
admin.site.index_title = "Welcome to iGrodno game portal"


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'average_score',
        'count_score',
    )
    fieldsets = (
        (None, {
            'fields': (
                'id',
                'name',
                'description',
                'release_date',
                'logo',
                'preview_logo',
                'wallpaper',
                'preview_wallpaper',
                'score_list',
                'platforms',
                'genres',
                'screenshots',
            )
        }),
    )
    search_fields = (
        'name',
        'release_date',
    )
    list_filter = (
        'name',
    )
    readonly_fields = (
        'id',
        'preview_logo',
        'preview_wallpaper',
    )

    @staticmethod
    def preview_logo(obj):
        return preview_image(obj, 'logo')

    @staticmethod
    def preview_wallpaper(obj):
        return preview_image(obj, 'wallpaper')


@admin.register(Score)
class ScoreAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': (
                'value',
                'user'
            )
        }),
    )
    search_fields = (
        'user',
    )
    readonly_fields = (

    )


@admin.register(Platform)
class PlatformAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': (
                'name',
                'short',
            )
        }),
    )
    search_fields = (
        'name',
    )
    readonly_fields = (

    )


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': (
                'name',
                'short',
            )
        }),
    )
    search_fields = (
        'name',
    )
    readonly_fields = (

    )


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': (
                'src',
                'preview_image',
            )
        }),
    )
    search_fields = (
        'src',
    )
    readonly_fields = (
        'preview_image',
    )

    @staticmethod
    def preview_image(obj):
        return preview_image(obj, 'src')
