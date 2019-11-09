from django.contrib.auth.models import User
from django.db import models
from django.db.models import Avg, Sum
from image_optimizer.fields import OptimizedImageField

from web.helpers import compress_image, RandomFileName

GENRES = {
    'action': {
        'name': 'Экшен',
        'full': 'Экшен (Action)'
    },
    'rpg': {
        'name': 'Ролевая',
        'full': 'Ролевые (RPG)'
    },
    'first_person': {
        'name': 'От первого лица',
        'full': 'От первого лица (First-person)'
    },
    'open_world': {
        'name': 'Открытый мир',
        'full': 'с Открытым миром (Open world)'
    },
    'cyberpunk': {
        'name': 'Киберпанк',
        'full': 'Киберпанк (Cyberpunk)'
    },
    'shooter': {
        'name': 'Шутер',
        'full': 'Шутеры (Shooters)'
    },
    'coop': {
        'name': 'Кооператив',
        'full': 'Кооперативы (Cooperatives)'
    },
    'adventure': {
        'name': 'Адвенчура',
        'full': 'Адвенчура (Adventure)'
    },
    'third_person': {
        'name': 'От третьего лица',
        'full': 'От третьего лица (Third-person)'
    },
    'fantasy': {
        'name': 'Фэнтези',
        'full': 'Фэнтези (Fantasy)'
    },
    'western': {
        'name': 'Вестерн',
        'full': 'Вестерн (Western)'
    },
    'online': {
        'name': 'Мультиплеер',
        'full': 'Мультиплееры (Online)'
    },
    'indie': {
        'name': 'Инди',
        'full': 'Инди (Indie)'
    },
    'sandbox': {
        'name': 'Песочница',
        'full': 'Песочницы (Sandbox)'
    },
    'strategy': {
        'name': 'Стратегия',
        'full': 'Стратегия (Strategy)'
    },
}

PLATFORMS = {
    'pc': {
        'name': 'PC',
        'full': 'PC (ПК)'
    },
    'ps3': {
        'name': 'PS3',
        'full': 'PlayStation 3 (PS3)'
    },
    'ps4': {
        'name': 'PS4',
        'full': 'PlayStation 4 (PS4)'
    },
    'xbox360': {
        'name': 'Xbox 360',
        'full': 'Xbox 360'
    },
    'xboxone': {
        'name': 'Xbox One',
        'full': 'Xbox One'
    }
}

GENRES_DATA = (
    tuple(map(lambda x: (
        GENRES[x]['name'], GENRES[x]['name']
    ), GENRES)),
    tuple(map(lambda x: (
        x, GENRES[x]['name']
    ), GENRES)),
)

PLATFORMS_DATA = (
    tuple(map(lambda x: (
        PLATFORMS[x]['name'], PLATFORMS[x]['name']
    ), PLATFORMS)),
    tuple(map(lambda x: (
        x, PLATFORMS[x]['name']
    ), PLATFORMS)),
)


class Score(models.Model):
    value = models.IntegerField('Score value')

    user = models.ForeignKey(User, models.CASCADE)

    def __str__(self):
        return "%s | %s" % (self.user, self.value)

    class Meta:
        verbose_name = 'score'
        verbose_name_plural = 'scores'
        ordering = ['value']


class Genre(models.Model):
    name = models.CharField('Genre name', max_length=64, choices=GENRES_DATA[0], null=True, blank=True)
    short = models.CharField('Short name', max_length=32, choices=GENRES_DATA[1], null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'genre'
        verbose_name_plural = 'genres'
        ordering = ['name']


class Platform(models.Model):
    name = models.CharField('Platform name', max_length=32, choices=PLATFORMS_DATA[0], null=True, blank=True)
    short = models.CharField('Short name', max_length=32, choices=PLATFORMS_DATA[1], null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'platform'
        verbose_name_plural = 'platforms'
        ordering = ['name']


class Image(models.Model):
    src = OptimizedImageField('Image', upload_to=RandomFileName('uploads', 'images'), null=True, blank=True)

    def __str__(self):
        return self.src.name

    def save(self, *args, **kwargs):
        if not self.id:
            if self.src:
                self.src = compress_image(self.src)

        super(Image, self).save(*args, **kwargs)

    class Meta:
        verbose_name = 'image'
        verbose_name_plural = 'images'


class Game(models.Model):
    id = models.AutoField(primary_key=True)

    name = models.CharField('Game name', max_length=512, default='', blank=True)
    description = models.TextField('Game description', default='', blank=True)

    release_date = models.DateField('Release date', null=True, blank=True)

    logo = OptimizedImageField(
        'Game logo',
        upload_to=RandomFileName('uploads', 'logos'), null=True, blank=True)
    wallpaper = OptimizedImageField(
        'Game wallpaper',
        upload_to=RandomFileName('uploads', 'wallpapers'), null=True, blank=True)

    score_list = models.ManyToManyField(Score, blank=True)
    platforms = models.ManyToManyField(Platform, blank=True)
    genres = models.ManyToManyField(Genre, blank=True)
    screenshots = models.ManyToManyField(Image, blank=True)

    average_score = models.FloatField('Average score', default=0, blank=True)
    count_score = models.IntegerField('Count score', default=0, blank=True)

    def calc_average_score(self):
        average = self.score_list.values('value').annotate(
            sum=Sum('value')
        ).aggregate(
            average=Avg('sum')
        )['average']
        return average if average is not None else 0

    def save(self, *args, **kwargs):
        if self.id is not None:
            self.average_score = self.calc_average_score()
            self.count_score = self.score_list.count()

            if self.logo:
                self.logo = compress_image(self.logo)

            if self.wallpaper:
                self.wallpaper = compress_image(self.wallpaper)

        super(Game, self).save(*args, **kwargs)

    def __str__(self):
        return "%s" % self.name

    class Meta:
        verbose_name = 'game'
        verbose_name_plural = 'games'
        ordering = ['name']
