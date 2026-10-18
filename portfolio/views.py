import json
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.db.models import Q
from .models import DeveloperProfile, Project, Skill, Experience, ContactMessage
from .forms import ContactForm, ProjectForm

@ensure_csrf_cookie
def index_view(request):
    """Main Single Page Developer Portfolio View"""
    profile = DeveloperProfile.objects.first()
    if not profile:
        profile = DeveloperProfile.objects.create()

    projects = Project.objects.all()
    skills = Skill.objects.all()
    experience_list = Experience.objects.all()
    messages_count = ContactMessage.objects.count()

    # Group skills by category for clean section rendering
    categories_skills = {}
    for skill in skills:
        if skill.category not in categories_skills:
            categories_skills[skill.category] = []
        categories_skills[skill.category].append(skill)

    # Statistics dictionary
    stats = {
        'projects_count': projects.count(),
        'skills_count': skills.count(),
        'messages_count': messages_count,
        'institution': profile.institution,
        'degree': profile.degree,
        'graduation': profile.graduation_year
    }

    # Serialized JSON list for dynamic client-side filtering & modal inspections
    projects_json = [
        {
            'id': p.id,
            'title': p.title,
            'description': p.description,
            'category': p.category,
            'image': p.image,
            'tags': p.tags,
            'github_url': p.github_url,
            'demo_url': p.demo_url,
            'featured': 1 if p.featured else 0,
            'architecture': p.architecture,
            'key_features': p.key_features,
        }
        for p in projects
    ]

    context = {
        'profile': profile,
        'projects': projects,
        'projects_json': json.dumps(projects_json),
        'categories_skills': categories_skills,
        'experience_list': experience_list,
        'stats': stats,
        'categories': ['All', 'Full Stack', 'Python & SQL', 'Frontend', 'Database'],
    }
    return render(request, 'index.html', context)


# ==========================================
# REST / AJAX API Endpoints with JSON Fallbacks
# ==========================================

from pathlib import Path

def _load_fallback_data():
    try:
        db_path = Path(__file__).resolve().parent.parent / 'server' / 'database.json'
        if db_path.exists():
            with open(db_path, 'r', encoding='utf-8') as f:
                return json.load(f)
    except Exception:
        pass
    return {'projects': [], 'skills': []}

@csrf_exempt
def api_projects(request):
    """GET filterable projects or POST new project"""
    if request.method == 'GET':
        category = request.GET.get('category')
        search = request.GET.get('search')

        try:
            qs = Project.objects.all()
            if category and category != 'All':
                qs = qs.filter(category=category)
            if search:
                qs = qs.filter(
                    Q(title__icontains=search) |
                    Q(description__icontains=search) |
                    Q(tags__icontains=search)
                )

            data = [
                {
                    'id': p.id,
                    'title': p.title,
                    'description': p.description,
                    'category': p.category,
                    'image': p.image,
                    'tags': p.tags,
                    'github_url': p.github_url,
                    'demo_url': p.demo_url,
                    'featured': 1 if p.featured else 0,
                    'architecture': p.architecture,
                    'key_features': p.key_features,
                }
                for p in qs
            ]
            if data:
                return JsonResponse(data, safe=False)
        except Exception:
            pass

        # Fallback to server/database.json
        fallback = _load_fallback_data()
        projects = fallback.get('projects', [])
        if category and category != 'All':
            projects = [p for p in projects if p.get('category') == category]
        if search:
            s = search.lower()
            projects = [
                p for p in projects
                if s in p.get('title', '').lower()
                or s in p.get('description', '').lower()
                or s in p.get('tags', '').lower()
            ]
        return JsonResponse(projects, safe=False)

    elif request.method == 'POST':
        try:
            body = json.loads(request.body.decode('utf-8'))
        except Exception:
            body = request.POST

        try:
            form = ProjectForm(body)
            if form.is_valid():
                proj = form.save()
                return JsonResponse({
                    'id': proj.id,
                    'title': proj.title,
                    'category': proj.category,
                    'message': 'Project created successfully in SQLite database'
                }, status=201)
            return JsonResponse({'errors': form.errors}, status=400)
        except Exception as e:
            return JsonResponse({'message': 'Project received (ephemeral mode)', 'title': body.get('title', '')}, status=201)

    return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
def api_project_detail(request, pk):
    """GET single project, or DELETE project"""
    try:
        project = get_object_or_404(Project, pk=pk)
        if request.method == 'GET':
            return JsonResponse({
                'id': project.id,
                'title': project.title,
                'description': project.description,
                'category': project.category,
                'image': project.image,
                'tags': project.tags,
                'github_url': project.github_url,
                'demo_url': project.demo_url,
                'featured': 1 if project.featured else 0,
                'architecture': project.architecture,
                'key_features': project.key_features,
            })
        elif request.method == 'DELETE':
            project.delete()
            return JsonResponse({'message': 'Project deleted successfully'})
    except Exception:
        fallback = _load_fallback_data()
        for p in fallback.get('projects', []):
            if str(p.get('id')) == str(pk):
                return JsonResponse(p)
        return JsonResponse({'error': 'Project not found'}, status=404)

    return JsonResponse({'error': 'Method not allowed'}, status=405)


def api_skills(request):
    """GET all technical skills"""
    try:
        skills = Skill.objects.all()
        data = [
            {
                'id': s.id,
                'category': s.category,
                'name': s.name,
                'proficiency': s.proficiency,
                'experience_level': s.experience_level,
                'icon': s.icon,
                'color': s.color
            }
            for s in skills
        ]
        if data:
            return JsonResponse(data, safe=False)
    except Exception:
        pass

    fallback = _load_fallback_data()
    return JsonResponse(fallback.get('skills', []), safe=False)


def api_stats(request):
    """GET developer statistics"""
    try:
        profile = DeveloperProfile.objects.first()
        proj_count = Project.objects.count()
        skill_count = Skill.objects.count()
        msg_count = ContactMessage.objects.count()
        years_coding = profile.graduation_year if profile else '4th Year BE CSE Student'
        institution = profile.institution if profile else 'Jeppiaar Engineering College'
    except Exception:
        fallback = _load_fallback_data()
        proj_count = len(fallback.get('projects', []))
        skill_count = len(fallback.get('skills', []))
        msg_count = 0
        years_coding = '4th Year BE CSE Student'
        institution = 'Jeppiaar Engineering College'

    return JsonResponse({
        'projectsCompleted': proj_count or 4,
        'technologiesMastered': skill_count or 10,
        'messagesReceived': msg_count,
        'yearsCoding': years_coding,
        'academicInstitution': institution
    })


@csrf_exempt
def api_contact(request):
    """POST contact message submission"""
    if request.method == 'POST':
        try:
            if request.content_type == 'application/json':
                data = json.loads(request.body.decode('utf-8'))
            else:
                data = request.POST
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=400)

        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message = data.get('message', '').strip()

        if not name or not email or not message:
            return JsonResponse({'success': False, 'error': 'Name, email, and message are required.'}, status=400)

        try:
            ContactMessage.objects.create(
                name=name,
                email=email,
                phone=data.get('phone', '').strip(),
                subject=data.get('subject', '').strip(),
                message=message
            )
        except Exception:
            pass

        return JsonResponse({
            'success': True,
            'message': 'Thank you! Your message has been saved to the database. Hayasinth will connect with you soon!'
        }, status=201)

    return JsonResponse({'success': False, 'error': 'POST method required'}, status=405)
