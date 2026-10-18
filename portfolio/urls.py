from django.urls import path
from . import views

urlpatterns = [
    # Main Page
    path('', views.index_view, name='index'),
    path('index.html', views.index_view, name='index_html'),

    # REST / AJAX API Endpoints (supporting both with and without trailing slash)
    path('api/projects', views.api_projects),
    path('api/projects/', views.api_projects, name='api_projects'),
    path('api/projects/<int:pk>', views.api_project_detail),
    path('api/projects/<int:pk>/', views.api_project_detail, name='api_project_detail'),
    path('api/skills', views.api_skills),
    path('api/skills/', views.api_skills, name='api_skills'),
    path('api/stats', views.api_stats),
    path('api/stats/', views.api_stats, name='api_stats'),
    path('api/contact', views.api_contact),
    path('api/contact/', views.api_contact, name='api_contact'),
]
