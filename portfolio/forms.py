from django import forms
from .models import ContactMessage, Project

class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Your Full Name', 'required': True, 'class': 'form-input'}),
            'email': forms.EmailInput(attrs={'placeholder': 'your.email@example.com', 'required': True, 'class': 'form-input'}),
            'phone': forms.TextInput(attrs={'placeholder': '+91 98765 43210 (Optional)', 'class': 'form-input'}),
            'subject': forms.TextInput(attrs={'placeholder': 'Project Collaboration / Inquiry', 'class': 'form-input'}),
            'message': forms.Textarea(attrs={'placeholder': 'Hello Hayasinth, I would like to discuss...', 'required': True, 'rows': 5, 'class': 'form-input'}),
        }


class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ['title', 'description', 'category', 'image', 'tags', 'github_url', 'demo_url', 'featured', 'architecture', 'key_features']
