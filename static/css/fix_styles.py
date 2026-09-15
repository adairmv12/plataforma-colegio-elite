import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Remove vertical lines on hover for career cards
css = re.sub(r'\.career-tile-crystal::after\s*\{[^}]*\}\s*\.career-tile-crystal:hover::after\s*\{[^}]*\}', '', css)

# 2. Add backgrounds to Campus and Contacto
new_campus = '''#seccion-campus {
  background: 
    linear-gradient(180deg, rgba(8,14,19,0.30) 0%, rgba(4,6,8,0.70) 100%),
    url('/static/img/aula-universitaria.png') center/cover no-repeat;
  background-attachment: fixed;
}
[data-theme="light"] #seccion-campus {
  background: 
    linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.40) 100%),
    url('/static/img/aula-universitaria.png') center/cover no-repeat;
  background-attachment: fixed;
}'''
css = re.sub(r'#seccion-campus\s*\{\s*background:\s*var\(--bg-accent\);\s*\}', new_campus, css)

new_contacto = '''#seccion-contacto {
  background: 
    linear-gradient(0deg, rgba(8,14,19,0.90) 0%, rgba(4,6,8,0.40) 100%),
    url('/static/img/fachada-colegio-elite.png') center/cover no-repeat;
  background-attachment: fixed;
}
[data-theme="light"] #seccion-contacto {
  background: 
    linear-gradient(0deg, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.20) 100%),
    url('/static/img/fachada-colegio-elite.png') center/cover no-repeat;
  background-attachment: fixed;
}'''
css = re.sub(r'#seccion-contacto\s*\{\s*background:\s*var\(--bg-base\);\s*\}', new_contacto, css)

# 3. Force section titles and intros to be white/legible against photos in ALL themes
force_white_text = '''
.section-heading, .section-intro {
  color: #FFFFFF !important;
  text-shadow: 0 2px 12px rgba(0,0,0,0.8) !important;
}
[data-theme="light"] .section-heading,
[data-theme="light"] .section-intro {
  color: #FFFFFF !important;
  text-shadow: 0 2px 12px rgba(0,0,0,0.8) !important;
}

[data-theme="light"] #seccion-carreras .section-heading,
[data-theme="light"] #seccion-carreras .section-intro {
  color: #FFFFFF !important;
}
'''
css = css + '\n' + force_white_text

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
