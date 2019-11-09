from rest_framework import serializers

from web.models import Game, Genre, Image, Platform


class PlatformSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=32)
    short = serializers.CharField(max_length=32)

    class Meta:
        model = Platform
        fields = (
            'name',
            'short'
        )


class GenreSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=32)
    short = serializers.CharField(max_length=32)

    class Meta:
        model = Genre
        fields = (
            'name',
            'short',
        )


class ImageSerializer(serializers.Serializer):
    src = serializers.ImageField()

    class Meta:
        model = Image
        fields = (
            'src'
        )


class GameSerializer(serializers.Serializer):
    id = serializers.IntegerField()

    name = serializers.CharField(max_length=512)
    description = serializers.CharField(max_length=8192)

    release_date = serializers.DateField()

    logo = serializers.ImageField()
    wallpaper = serializers.ImageField()

    average_score = serializers.FloatField()
    count_score = serializers.IntegerField()

    platforms = PlatformSerializer(many=True, read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    screenshots = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = (
            'id',

            'name',
            'description',

            'release_date',

            'logo',
            'wallpaper',

            'average_score',
            'count_score',

            'platforms',
            'genres',
            'screenshots',
        )
