from django.contrib import admin
from .models import DeveloperProfile, Project, Skill, Experience, ContactMessage

@admin.register(DeveloperProfile)
class DeveloperProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'institution', 'degree', 'email', 'phone')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'featured', 'created_at')
    list_filter = ('category', 'featured')
    search_fields = ('title', 'description', 'tags')
    list_editable = ('featured',)

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'experience_level', 'order')
    list_filter = ('category', 'experience_level')
    list_editable = ('proficiency', 'order')
    search_fields = ('name',)

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'organization', 'duration', 'type', 'order')
    list_filter = ('type',)
    search_fields = ('role', 'organization', 'skills_used')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'message')
    readonly_fields = ('created_at',)
