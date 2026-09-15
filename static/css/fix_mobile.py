import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Update glass to "blanco cristal" (milky frosted, visibly transparent)
css = re.sub(
    r'--glass-clear:\s*rgba\(255,255,255,0\.88\);',
    r'--glass-clear:        rgba(255,255,255,0.35);',
    css
)
css = re.sub(
    r'--glass-frost:\s*rgba\(255,255,255,0\.92\);',
    r'--glass-frost:        rgba(255,255,255,0.55);',
    css
)
css = re.sub(
    r'--glass-clear:\s*rgba\(15,32,39,0\.80\);',
    r'--glass-clear:        rgba(15,32,39,0.35);',
    css
)
css = re.sub(
    r'--glass-frost:\s*rgba\(10,15,20,0\.88\);',
    r'--glass-frost:        rgba(10,15,20,0.55);',
    css
)

# 2. Add max-width: 100vw and overflow-x: hidden to prevent horizontal scroll breaking
if 'overflow-x: hidden;' not in css:
    css = css.replace('html {', 'html {\n  overflow-x: hidden;\n  max-width: 100vw;')
    css = css.replace('body {', 'body {\n  overflow-x: hidden;\n  max-width: 100vw;')

# 3. Make header perfectly responsive for mobile
# Currently it is:
# .header-container { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; height: 100%; }
# This overflows on mobile because '1fr' has a minimum width determined by the right toggle button.

responsive_css = '''
@media (max-width: 560px) {
  .header-container {
    display: flex !important;
    justify-content: space-between !important;
    padding: 0 0.5rem;
  }
  .header-left { display: none !important; }
  .brand-name-text {
    font-size: 0.9rem !important;
    letter-spacing: 0.05em !important;
  }
  .theme-label { display: none !important; }
  .theme-toggle-btn { padding: 0.35rem 0.5rem !important; }
  .brand-svg-container { width: 32px !important; height: 32px !important; }
  
  /* Fix tabs bar scrolling on mobile */
  .section-tabs-bar .container {
    padding: 0;
  }
  .tabs-nav-list {
    gap: 0.5rem;
    padding-bottom: 4px;
  }
  .section-tab-chip {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
  }
}
'''
css = css + '\n' + responsive_css

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
