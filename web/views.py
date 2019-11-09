import json
import random

from django.http import HttpResponseNotFound, Http404
from django.shortcuts import render
from django.views import View
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from web.models import Game, GENRES, PLATFORMS
from web.paginationes import GamePagination
from web.serializers import GameSerializer

RID = int(random.random() * (10 ** 12))


class IndexView(View):
    def get(self, request):
        return render(request, 'main/index.html', {
            'RID': RID,
            'pageTitle': 'iGrodno - Игровой портал',
            'portalTitle': 'iGrodno',
            'additional': 'null',
        })


class GameView(View):
    def get(self, request, pk=None):
        game = get_object_or_404(Game, id=pk)
        serializer = GameSerializer(game)

        return render(request, 'main/index.html', {
            'RID': RID,
            'pageTitle': f'{game.name} | iGrodno',
            'portalTitle': 'iGrodno',
            'additional': json.dumps({
                'game': serializer.data,
                'user': {
                    'is_anonymous': request.user.is_anonymous,
                    'data': {
                        'username': request.user.username,
                        'first_name': request.user.first_name,
                        'last_name': request.user.last_name,
                        'email': request.user.email,
                    } if not request.user.is_anonymous else None,
                }
            })
        })


class GamesView(View):
    def get(self, request):
        games_type = 'Худшие' if request.GET.get('games') == 'worst' else 'Лучшие'
        games_type_end = 'худших' if request.GET.get('games') == 'worst' else 'лучших'
        platforms = request.GET.get('platforms')
        genres = request.GET.get('genres')

        platform = None
        genre = None

        try:
            if platforms is not None and genres is not None:
                platform = PLATFORMS[platforms]['full']
                genre = GENRES[genres]['full']
                name = f'{games_type} игры {genre} на {platform} - популярные игры {genre} для {platform}'

            elif platforms is not None:
                platform = PLATFORMS[platforms]['full']
                name = f'{games_type} игры на {platform} - популярные игры для {platform}'

            elif genres is not None:
                genre = GENRES[genres]['full']
                name = f'{games_type} игры {genre} - популярные игры {genre}, список {games_type_end}'

            else:
                name = f'{games_type} игры - самые популярные игры, список {games_type_end}'

        except KeyError:
            raise Http404()

        return render(request, 'main/index.html', {
            'RID': RID,
            'pageTitle': f'{name} | iGrodno',
            'portalTitle': 'iGrodno',
            'additional': json.dumps({
                'games_type': games_type,
                'genre': genre,
                'platform': platform,
                'games_type_end': games_type_end,
                'user': {
                    'is_anonymous': request.user.is_anonymous,
                    'data': {
                        'username': request.user.username,
                        'first_name': request.user.first_name,
                        'last_name': request.user.last_name,
                        'email': request.user.email,
                    } if not request.user.is_anonymous else None,
                }
            }),
        })


class GameAPI(APIView):
    queryset = Game.objects.all()

    def get(self, request, pk=None):
        game = get_object_or_404(Game, id=pk)
        serializer = GameSerializer(game)

        return Response(serializer.data, status=status.HTTP_200_OK)


class GamesAPI(generics.ListAPIView):
    serializer_class = GameSerializer
    pagination_class = GamePagination
    filter_backends = (DjangoFilterBackend,)

    def get_queryset(self):
        games_type = self.request.query_params.get('games', 'best')

        if games_type == 'worst':
            queryset = Game.objects.all().order_by('average_score', '-count_score')

        else:
            queryset = Game.objects.all().order_by('-average_score', '-count_score')

        platforms = self.request.query_params.get('platforms')
        genres = self.request.query_params.get('genres')

        if platforms:
            for platform in platforms.split(','):
                queryset = queryset.filter(platforms__short=platform)

        if genres:
            for genre in genres.split(','):
                queryset = queryset.filter(genres__short=genre)

        return queryset
