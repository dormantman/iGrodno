from django.conf.urls import url
from django.urls import path

from . import views

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),

    url(r'api/game/(?P<pk>[\d]+)/$', views.GameAPI.as_view(), name='game'),
    path('api/games/', views.GamesAPI.as_view(), name='game-list'),

    url(r'game/(?P<pk>[\d]+)/$', views.GameView.as_view(), name='game'),
    path('games/', views.GamesView.as_view(), name='games'),

]
