import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
django.setup()

from portfolio.models import DeveloperProfile, Project, Skill, Experience

def seed():
    print("🌱 Populating SQLite database for Hayasinth M Portfolio...")

    # 1. Developer Profile
    profile, created = DeveloperProfile.objects.get_or_create(
        id=1,
        defaults={
            'name': 'Hayasinth M',
            'headline': 'Full Stack & Python Developer | BE CSE (4th Year)',
            'badge': 'Aspiring Software Engineer',
            'institution': 'Jeppiaar Engineering College',
            'degree': 'B.E. Computer Science and Engineering',
            'graduation_year': '2023 - 2027',
            'bio': 'Currently pursuing B.E. Computer Science and Engineering at Jeppiaar Engineering College. Passionate about building modern full-stack web applications, database-driven systems using SQL and Python, and clean responsive frontends with JavaScript, HTML5, CSS3, and React.',
            'email': 'hayasinth284@gmail.com',
            'phone': '+91 8122208962',
            'location': 'Chennai, Tamil Nadu',
            'github_url': 'https://github.com/hayasinth284',
            'linkedin_url': 'https://www.linkedin.com/in/hayasinth284'
        }
    )

    # 2. Projects
    projects_data = [
        {
            'title': 'My Portfolio',
            'description': 'A high-performance modern developer portfolio featuring 3D Deep Space starfield warp animations, interactive HTML5 Canvas particle physics, Express REST API backend, persistent SQL/JSON storage, and responsive glassmorphism UI.',
            'category': 'Full Stack',
            'image': '/static/images/project2.jpg',
            'tags': 'JavaScript, React, Node.js, Express, HTML5 Canvas 3D, CSS3, REST API, SQL',
            'github_url': 'https://github.com/hayasinth284/My_Portfolio',
            'demo_url': 'http://localhost:5000',
            'featured': True,
            'architecture': 'Node.js & Express REST Backend + React & Vanilla CSS UI + GPU-Accelerated 3D Canvas Graphics Engine',
            'key_features': '3D Deep Space warp flight animation; Multi-mode animation switcher (Space, 3D Quantum, Magnetic Vortex); Live Contact Form with persistent DB; Admin Content Manager; Light/Dark theme engine; Mobile-responsive design',
            'order': 1
        },
        {
            'title': 'TaskFlow - Task Management System',
            'description': 'A full-featured, responsive, real-time task management web application built with Python, Django 5, SQLite, HTML5, Vanilla CSS3, and Modern JavaScript (ES6+). Features interactive drag-and-drop Kanban boards, live subtask checklists with progress tracking, dynamic HTML5 Canvas productivity analytics, interactive calendar timeline, and role-based user authentication.',
            'category': 'Full Stack',
            'image': '/static/images/project_taskmanagement.jpg',
            'tags': 'Task_Management, Python, Django, SQLite, JavaScript, HTML5, CSS3, REST API, Kanban',
            'github_url': 'https://github.com/hayasinth284/Task_Management',
            'demo_url': 'https://github.com/hayasinth284/Task_Management',
            'featured': True,
            'architecture': 'Django 5 REST & Session Backend + SQLite Relational Database + Vanilla JS Kanban & Analytics Canvas Engine + Glassmorphism UI',
            'key_features': 'Interactive Drag-and-Drop Kanban Board across 5 status columns; Dynamic Subtask Checklist with real-time progress bar; Real-Time Productivity Analytics with HTML5 Canvas charts; Interactive Calendar timeline & deadline scheduling; Multi-parameter filtering, sorting & live search; Secure Django user authentication, session security & role isolation',
            'order': 2
        }
    ]

    # Clean old projects that are not in projects_data
    valid_titles = [p['title'] for p in projects_data]
    Project.objects.exclude(title__in=valid_titles).delete()

    for p in projects_data:
        Project.objects.update_or_create(
            title=p['title'],
            defaults=p
        )

    # 3. Technical Skills
    skills_data = [
        # Programming Languages
        {'category': 'Programming Languages', 'name': 'Python', 'proficiency': 92, 'experience_level': 'Expert', 'order': 1},
        {'category': 'Programming Languages', 'name': 'JavaScript (ES6+)', 'proficiency': 90, 'experience_level': 'Advanced', 'order': 2},
        # Database & SQL
        {'category': 'Database & SQL', 'name': 'SQL (Relational Queries & Optimization)', 'proficiency': 92, 'experience_level': 'Expert', 'order': 3},
        {'category': 'Database & SQL', 'name': 'SQLite & MySQL', 'proficiency': 86, 'experience_level': 'Advanced', 'order': 4},
        # Web Frontend
        {'category': 'Web Frontend', 'name': 'HTML5 & Semantic Markup', 'proficiency': 95, 'experience_level': 'Expert', 'order': 5},
        {'category': 'Web Frontend', 'name': 'CSS3 / Flexbox / Grid', 'proficiency': 92, 'experience_level': 'Expert', 'order': 6},
        {'category': 'Web Frontend', 'name': 'React.js & Modern UI', 'proficiency': 85, 'experience_level': 'Advanced', 'order': 7},
        # Backend Development
        {'category': 'Backend Development', 'name': 'Python / Django Framework', 'proficiency': 90, 'experience_level': 'Advanced', 'order': 8},
        {'category': 'Backend Development', 'name': 'RESTful API Architecture', 'proficiency': 88, 'experience_level': 'Advanced', 'order': 9},
        {'category': 'Backend Development', 'name': 'Node.js & Express.js', 'proficiency': 82, 'experience_level': 'Intermediate', 'order': 10},
        # Developer Tools
        {'category': 'Developer Tools', 'name': 'Git & GitHub Version Control', 'proficiency': 88, 'experience_level': 'Advanced', 'order': 11},
        {'category': 'Developer Tools', 'name': 'VS Code & Linux CLI', 'proficiency': 88, 'experience_level': 'Advanced', 'order': 12},
    ]

    for s in skills_data:
        Skill.objects.update_or_create(
            name=s['name'],
            defaults=s
        )

    # 4. Education & Experience
    Experience.objects.update_or_create(
        role='B.E. Computer Science & Engineering (4th Year)',
        organization='Jeppiaar Engineering College',
        defaults={
            'duration': '2023 - 2027',
            'description': 'Specializing in Core Computer Science, Software Engineering, Python Programming, Database Management Systems (DBMS), Data Structures, and Web Application Architecture.',
            'skills_used': 'Python, Django, SQL, SQLite, HTML5, CSS3, JavaScript, DBMS',
            'type': 'Education',
            'order': 1
        }
    )

    print("✅ Successfully seeded SQLite database with all projects, skills, and profile!")

if __name__ == '__main__':
    seed()
