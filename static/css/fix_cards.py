import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update Variables to make CARDS solid/frosted (providing the contrast)
# Dark Mode Glass
css = re.sub(
    r'--glass-clear:\s*rgba\(15,32,39,0\.02\);',
    r'--glass-clear:        rgba(15,32,39,0.80);',
    css
)
css = re.sub(
    r'--glass-frost:\s*rgba\(10,15,20,0\.06\);',
    r'--glass-frost:        rgba(10,15,20,0.88);',
    css
)

# Light Mode Glass
css = re.sub(
    r'--glass-clear:\s*rgba\(255,255,255,0\.04\);',
    r'--glass-clear:        rgba(255,255,255,0.88);',
    css
)
css = re.sub(
    r'--glass-frost:\s*rgba\(255,255,255,0\.10\);',
    r'--glass-frost:        rgba(255,255,255,0.92);',
    css
)

# 2. Increase blur so the cards look like frosted glass rather than flat colors
css = css.replace('blur(3px)', 'blur(16px)')
css = css.replace('blur(4px)', 'blur(16px)')
css = css.replace('blur(5px)', 'blur(24px)')

# 3. Reduce background overlays in Light Mode to make photos VIVID and SHARP
css = css.replace(
    'linear-gradient(175deg, rgba(240,244,248,0.75) 0%, rgba(240,244,248,0.85) 100%)',
    'linear-gradient(175deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.25) 100%)'
)
css = css.replace(
    'linear-gradient(180deg, rgba(240,244,248,0.75) 0%, rgba(240,244,248,0.85) 100%)',
    'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.25) 100%)'
)

# 4. Make Dark Mode backgrounds also super vivid
css = css.replace(
    'linear-gradient(180deg, rgba(8,14,19,0.70) 0%, rgba(4,6,8,0.40) 100%)',
    'linear-gradient(180deg, rgba(8,14,19,0.10) 0%, rgba(4,6,8,0.30) 100%)'
)
css = css.replace(
    'linear-gradient(180deg, rgba(8,14,19,0.50) 0%, rgba(4,6,8,0.80) 100%)',
    'linear-gradient(180deg, rgba(8,14,19,0.10) 0%, rgba(4,6,8,0.30) 100%)'
)
css = css.replace(
    'linear-gradient(175deg, rgba(15,32,39,0.95) 0%, rgba(10,15,20,0.85) 100%)',
    'linear-gradient(175deg, rgba(15,32,39,0.20) 0%, rgba(10,15,20,0.40) 100%)'
)

# Remove old text hacks just in case
css = re.sub(r'\.section-heading, \.section-intro\s*\{\s*color:\s*#FFFFFF\s*!important;\s*text-shadow:[^}]*\}\s*', '', css)
css = re.sub(r'\[data-theme="light"\]\s*\.section-heading,\s*\[data-theme="light"\]\s*\.section-intro\s*\{\s*color:\s*#FFFFFF\s*!important;\s*text-shadow:[^}]*\}\s*', '', css)

# Re-add white text for section headings so they read well over vivid photos
white_hack = '''
.section-heading, .section-intro { color: #FFFFFF !important; text-shadow: 0 2px 12px rgba(0,0,0,0.8) !important; }
[data-theme="light"] .section-heading, [data-theme="light"] .section-intro { color: #FFFFFF !important; text-shadow: 0 2px 12px rgba(0,0,0,0.8) !important; }
'''
css = css + '\n' + white_hack

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
