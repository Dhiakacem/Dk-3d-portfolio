"""Rebuild the CVs and images. Usage: python scripts/prepare_assets.py CV_DIRECTORY IMSET_LOGO"""
from pathlib import Path
import sys
import shutil
from xml.sax.saxutils import escape
from PIL import Image, ImageOps
from pypdf import PdfReader
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import reportlab

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(sys.argv[1])
IMSET_LOGO = Path(sys.argv[2])
ASSETS = ROOT / 'src/assets'
OUT = ROOT / 'public/cv'
portrait = PdfReader(SOURCE / 'DHIA_KACEM_EN.pdf').pages[0].images[0].image
avatar = ImageOps.fit(portrait, (144, 144), centering=(0.5, 0.26))
avatar.save(ASSETS / 'avatar.webp', 'WEBP', quality=85)
imset = Image.open(IMSET_LOGO).convert('RGBA')
imset.thumbnail((480, 160), Image.Resampling.LANCZOS)
imset.save(ASSETS / 'company/imset.webp', 'WEBP', lossless=True, method=6)
for name in ['portfolio', 'QcMedProject', 'noz', 'archivefy', 'hgh', 'herobg']:
    im = Image.open(ASSETS / (name + '.png'))
    im.thumbnail((1600, 1000) if name == 'herobg' else (900, 600), Image.Resampling.LANCZOS)
    im.save(ASSETS / (name + '.webp'), 'WEBP', quality=78, method=6)
shutil.copyfile(SOURCE / 'DHIA_KACEM_EN.pdf', OUT / 'CV_DhiaKacem_EN.pdf')
fonts = Path(reportlab.__file__).parent / 'fonts'
for name, file in [('Vera', 'Vera.ttf'), ('Vera-Bold', 'VeraBd.ttf'), ('Vera-Italic', 'VeraIt.ttf'), ('Vera-BoldItalic', 'VeraBI.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(fonts / file)))
pdfmetrics.registerFontFamily('Vera', normal='Vera', bold='Vera-Bold', italic='Vera-Italic', boldItalic='Vera-BoldItalic')

# Reflow the original French wording; do not copy the malformed clipping graphics.
pdf = canvas.Canvas(str(OUT / 'CV_DhiaKacem_FR.pdf'), pagesize=A4)
pdf.setTitle('KACEM DHIA - CV Français')
pdf.setAuthor('Dhia Kacem')
W, H = A4
left, width = 35, W - 70
pdf.drawImage(ImageReader(avatar), 35, H-116, width=88, height=88, preserveAspectRatio=True, mask='auto')
pdf.setFont('Vera-Bold', 25)
pdf.drawCentredString(350, H-45, 'KACEM DHIA')
pdf.setFont('Vera-BoldItalic', 11)
pdf.drawCentredString(350, H-64, 'INGÉNIEUR FULL-STACK | ANGULAR • SPRING BOOT')
pdf.setFont('Vera', 9)
pdf.drawCentredString(350, H-83, 'Tunis, Tunisie | +216 95 603 918 | dhiaa.kacem@gmail.com')
pdf.drawCentredString(350, H-97, 'GitHub: github.com/Dhiakacem | LinkedIn: linkedin.com/in/dhia-kacem')
pdf.linkURL('https://github.com/Dhiakacem', (134,H-102,328,H-88), relative=0)
pdf.linkURL('https://linkedin.com/in/dhia-kacem', (330,H-102,W-35,H-88), relative=0)
pdf.line(left, H-124, W-left, H-124)
y = H-140
body = ParagraphStyle('body', fontName='Vera', fontSize=8.8, leading=11.5)
heading_style = ParagraphStyle('heading', fontName='Vera-BoldItalic', fontSize=10.8, leading=13)
def para(text, style=body, indent=0, gap=3, column_width=None):
    global y
    p = Paragraph(text, style)
    _, h = p.wrap(column_width or width-indent, 1000)
    p.drawOn(pdf, left+indent, y-h)
    y -= h+gap
def heading(text):
    global y
    y -= 4
    para(text, heading_style, gap=5)
def bullet(text):
    para('• '+escape(text), indent=10, gap=2)
def role(title, date, points):
    global y
    para('<b>'+escape(title)+'</b>', gap=2)
    para('<i>'+escape(date)+'</i>', gap=5)
    for text in points: bullet(text)
    y -= 4
heading('PROFIL')
para("<i>Ingénieur logiciel Full Stack avec plus de deux ans d’expérience dans le développement d’applications métier avec Java, Spring Boot, Angular et React. Expérience des API REST, de la gestion des accès, de PostgreSQL, MongoDB, Docker et GitLab CI/CD. Contributions à des produits SaaS, de gestion énergétique et de gestion documentaire, avec une attention particulière à la maintenabilité et au travail d’équipe.</i>")
heading('COMPÉTENCES TECHNIQUES')
for title, text in [
    ('Frontend', 'Angular (avancé : routing, lazy loading, architecture modulaire) • Angular Material • RxJS (Observables, BehaviorSubject) • React • TypeScript • Bootstrap • Postman • Swagger'),
    ('Backend & Microservices', 'Spring Boot • Spring Data JPA • Spring Security • API REST • Hibernate/JPA • Sérialisation JSON • Tests unitaires (JUnit) • NestJS • Maven • Gradle'),
    ('DevOps & Outils', 'Docker • Docker Compose • CI/CD (GitLab) • Git • PostgreSQL • SQLite • MongoDB • Agile/Scrum'),
    ('Mobile', 'Kotlin Multiplatform • Jetpack Compose • Android natif • Flutter • Dart')]:
    para('<b>'+escape(title)+' :</b> '+escape(text), gap=3)
heading('EXPÉRIENCE PROFESSIONNELLE')
role('Arsela Technologies — Développeur Full-Stack', 'Janvier 2025 — Présent', [
    "Développement d'applications métier avec Angular, React, Java et Spring Boot pour des flux immobiliers, énergétiques et documentaires.",
    'Contribution à des API REST sécurisées, aux droits par rôle, aux tableaux de bord et à la persistance PostgreSQL/MongoDB.',
    'Utilisation de Docker et GitLab CI/CD ; participation aux tests, revues de code et rituels Agile.'])
role('IMSET — Formateur (Java & Développement Android) [Temps partiel]', 'Septembre 2025 — Février 2026', [
    'Formation de plus de 40 étudiants en Java et développement Android natif',
    'Conception de travaux pratiques et encadrement de projets',
    'Évaluation des compétences via des revues de code',
    'Encadrement des bonnes pratiques : clean code, architecture logicielle, debugging'])
role('QcMed — Développeur Full-Stack', 'Avril 2024 — Mars 2025', [
    'Développement d’une plateforme de quiz médical pour la préparation au résidanat',
    'Amélioration d’une application mobile Flutter pour la révision',
    'Développement de la version web avec Angular & NestJS',
    'Conception et gestion de la base de données MongoDB',
    'Implémentation des statistiques utilisateurs, catégorisation et suivi de progression'])
heading('FORMATION')
para('<b>Cycle ingénieur en informatique</b>', gap=1)
para('École Internationale Multidisciplinaire<br/><i>Septembre 2021 — Juin 2024</i>', indent=10, gap=5)
para('<b>Licence appliquée en génie informatique</b>', gap=1)
para('ISSAT Sousse<br/><i>Septembre 2018 — Juin 2021</i>', indent=10, gap=4)
row_y = y
heading('LANGUES')
for text in ['Français : langue maternelle', 'Anglais : niveau professionnel', 'Arabe : langue maternelle']:
    bullet(text)
end_y = y
y = row_y
left = W/2+8
width = W/2-43
heading('CERTIFICATIONS')
para('<b>JetBrains Academy :</b> Certification Java Developer', gap=4)
para('<b>Flutter &amp; Dart :</b> Udemy')
assert min(y, end_y) >= 24, f'CV overflow: bottom {min(y,end_y):.1f}'
pdf.showPage()
pdf.save()
print(f'French CV bottom margin: {min(y,end_y):.1f}pt')
print('Optimized assets and both CVs are ready.')
