from .common import *

DEBUG = True

SECRET_KEY = "django-insecure-hs6j037urx6iav+7#10%-vu4l4f5@@-1_zo)oft4g7$vf2$jmp"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "sokoni",
        "HOST": "localhost",
        "USER": "root",
        "PASSWORD": "Kwema13kahama",
    }
}

CELERY_BROKER_URL = "redis://redis:6379/1"

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://redis:6379/2",
        "TIMEOUT": 10 * 60,
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    }
}

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = "familysokoni@gmail.com"
EMAIL_HOST_PASSWORD = "cetigbfhrcfsowkh"
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
DEFAULT_FROM_EMAIL = "familysokoni@gmail.com"

DEBUG_TOOLBAR_CONFIG = {"SHOW_TOOLBAR_CALLBACK": lambda request: True}
