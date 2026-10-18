from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from portfolio import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('index.html', views.index_view, name='root_index_html'),
    path('index.html/', views.index_view, name='root_index_html_slash'),
    path('', include('portfolio.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
