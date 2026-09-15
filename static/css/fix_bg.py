import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Remove the force_white_text hack at the end
css = re.sub(r'\.section-heading, \.section-intro \{[^}]*\}', '', css)
css = re.sub(r'\[data-theme="light"\] \.section-heading,\s*\[data-theme="light"\] \.section-intro \{[^}]*\}', '', css)
css = re.sub(r'\[data-theme="light"\] #seccion-carreras \.section-heading,\s*\[data-theme="light"\] #seccion-carreras \.section-intro \{[^}]*\}', '', css)

# 1. Update #seccion-contacto Light mode (so it is not fully white, but photo is visible with readable text)
css = re.sub(
    r'\[data-theme="light"\]\s*#seccion-contacto\s*\{\s*background:[\s\S]*?\}',
    '''[data-theme="light"] #seccion-contacto {
  background: 
    linear-gradient(175deg, rgba(240,244,248,0.75) 0%, rgba(240,244,248,0.85) 100%),
    url('/static/img/fachada-colegio-elite.png') center/cover no-repeat;
  background-attachment: fixed;
}''', css, count=1
)

# 2. Update #seccion-carreras Light mode (make background more white so dark text reads easily)
css = re.sub(
    r'\[data-theme="light"\]\s*#seccion-carreras\s*\{\s*background:[\s\S]*?\}',
    '''[data-theme="light"] #seccion-carreras {
  background: 
    linear-gradient(180deg, rgba(240,244,248,0.75) 0%, rgba(240,244,248,0.85) 100%),
    url('/static/img/practica-criminalistica.png') center/cover no-repeat;
  background-attachment: fixed;
}''', css, count=1
)

# 3. Update #seccion-campus Light mode
css = re.sub(
    r'\[data-theme="light"\]\s*#seccion-campus\s*\{\s*background:[\s\S]*?\}',
    '''[data-theme="light"] #seccion-campus {
  background: 
    linear-gradient(180deg, rgba(240,244,248,0.75) 0%, rgba(240,244,248,0.85) 100%),
    url('/static/img/aula-universitaria.png') center/cover no-repeat;
  background-attachment: fixed;
}''', css, count=1
)

# 4. Make Dark mode Campus slightly darker so white text pops
css = re.sub(
    r'#seccion-campus\s*\{\s*background:\s*linear-gradient\(180deg,\s*rgba\(8,14,19,0\.30\)\s*0%,\s*rgba\(4,6,8,0\.70\)\s*100%\)[\s\S]*?\}',
    '''#seccion-campus {
  background: 
    linear-gradient(180deg, rgba(8,14,19,0.50) 0%, rgba(4,6,8,0.80) 100%),
    url('/static/img/aula-universitaria.png') center/cover no-repeat;
  background-attachment: fixed;
}''', css, count=1
)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
