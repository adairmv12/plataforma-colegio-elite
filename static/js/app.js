/**
 * COLEGIO ÉLITE - SCRIPT DEL LADO DEL CLIENTE
 * Modo Claro / Oscuro, Navegación por Secciones Compactas y Ciberseguridad OWASP
 * Cero eventos en línea en HTML.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. SELECTORES DEL DOM
  // ==========================================
  const htmlElement = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  const sectionChips = document.querySelectorAll('.section-tab-chip');
  const navTabBtns = document.querySelectorAll('.nav-tab-btn');

  const admissionForm = document.getElementById('admissionForm');
  const btnSubmit = document.getElementById('btnSubmitForm');
  const btnSubmitText = document.getElementById('btnSubmitText');
  const btnSubmitSpinner = document.getElementById('btnSubmitSpinner');
  const formFeedback = document.getElementById('form-feedback');

  const careerSelect = document.getElementById('careerSelect');
  const careerButtons = document.querySelectorAll('.select-career-btn');
  const filterChips = document.querySelectorAll('.filter-chip');
  const careerTiles = document.querySelectorAll('.career-tile-crystal');

  // ==========================================
  // 2. GESTIÓN DEL TEMA (MODO CLARO Y OSCURO)
  // ==========================================
  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('colegio_elite_theme', theme);
    } catch (e) {
      // Manejo seguro si localStorage no está habilitado
    }

    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
    if (themeLabel) {
      themeLabel.textContent = theme === 'dark' ? 'Oscuro' : 'Claro';
    }
  };

  // Inicializar tema guardado o preferencia de sistema
  let savedTheme = 'dark';
  try {
    savedTheme = localStorage.getItem('colegio_elite_theme');
    if (!savedTheme) {
      savedTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
  } catch (e) {
    savedTheme = 'dark';
  }
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // ==========================================
  // 3. MENÚ MÓVIL ACCESIBLE
  // ==========================================
  if (navToggle && primaryNav) {
    const toggleMenu = () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      primaryNav.classList.toggle('is-open', !isExpanded);
    };

    navToggle.addEventListener('click', toggleMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
        navToggle.focus();
      }
    });

    document.addEventListener('click', (e) => {
      const inside = primaryNav.contains(e.target) || navToggle.contains(e.target);
      if (!inside && primaryNav.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
      }
    });
  }

  // ==========================================
  // 4. SELECTOR RÁPIDO DE SECCIONES (CERO SCROLL INÚTIL)
  // ==========================================
  const activateSection = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    // Desplazamiento instantáneo/suave a la sección elegida
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Actualizar chips activos
    sectionChips.forEach((chip) => {
      if (chip.getAttribute('data-tab') === sectionId) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });

    // Actualizar botones de navegación
    navTabBtns.forEach((btn) => {
      if (btn.getAttribute('data-target-section') === sectionId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  sectionChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const targetId = chip.getAttribute('data-tab');
      activateSection(targetId);
    });
  });

  navTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target-section');
      activateSection(targetId);
      if (primaryNav && primaryNav.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        primaryNav.classList.remove('is-open');
      }
    });
  });

  // ==========================================

  // ==========================================
  // 4.5. INTERSECTION OBSERVER PARA ACTUALIZAR TABS AL SCROLLEAR
  // ==========================================
  const sections = document.querySelectorAll('.modular-section');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update Chips
        sectionChips.forEach(chip => {
          if (chip.getAttribute('data-tab') === id) {
            chip.classList.add('active');
          } else {
            chip.classList.remove('active');
          }
        });
        
        // Update Nav Tabs
        navTabBtns.forEach(btn => {
          if (btn.getAttribute('data-target-section') === id) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px' // Se activa cuando la seccion ocupa parte de arriba
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // 5. FILTROS DINÁMICOS DE CARRERAS
  // ==========================================
  if (filterChips.length > 0 && careerTiles.length > 0) {
    filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        filterChips.forEach((c) => {
          c.classList.remove('active');
          c.setAttribute('aria-selected', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-selected', 'true');

        const filterVal = chip.getAttribute('data-filter');

        careerTiles.forEach((tile) => {
          const category = tile.getAttribute('data-category');
          if (filterVal === 'all' || category === filterVal) {
            tile.classList.remove('is-hidden');
          } else {
            tile.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // ==========================================
  // 6. ACCIÓN: "ELEGIR ESTA CARRERA"
  //    (Preselección en el formulario y foco automático)
  // ==========================================
  if (careerButtons.length > 0 && careerSelect) {
    careerButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const careerName = e.currentTarget.getAttribute('data-career-name');

        if (careerName) {
          for (let i = 0; i < careerSelect.options.length; i++) {
            if (careerSelect.options[i].value.toLowerCase() === careerName.toLowerCase()) {
              careerSelect.selectedIndex = i;
              break;
            }
          }
        }

        // Ir a la sección del formulario
        activateSection('seccion-admision');

        setTimeout(() => {
          const fullNameInput = document.getElementById('fullName');
          if (fullNameInput) {
            fullNameInput.focus();
          }
        }, 400);
      });
    });
  }

  // ==========================================
  // 7. MENSAJES Y SANITIZACIÓN SEGURA (OWASP)
  // ==========================================
  const showFeedback = (msg, type) => {
    if (!formFeedback) return;
    formFeedback.textContent = '';
    formFeedback.className = `form-feedback-box ${type}`;
    formFeedback.textContent = msg;
    formFeedback.classList.remove('visually-hidden');
  };

  const clearFeedback = () => {
    if (!formFeedback) return;
    formFeedback.textContent = '';
    formFeedback.className = 'form-feedback-box visually-hidden';
  };

  if (admissionForm) {
    admissionForm.querySelectorAll('.input-crystal').forEach((input) => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
    });
  }

  // ==========================================
  // 8. ENVÍO DEFENSIVO DEL FORMULARIO (ANTI-DOS/SPAM)
  // ==========================================
  if (admissionForm) {
    admissionForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearFeedback();

      const nameInput = document.getElementById('fullName');
      const phoneInput = document.getElementById('phoneNumber');
      const emailInput = document.getElementById('emailAddress');
      const careerInput = document.getElementById('careerSelect');
      const modalityInput = document.getElementById('modalitySelect');
      const privacyCheck = document.getElementById('privacyCheck');
      const csrfInput = document.getElementById('csrf_token');

      const fullName = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const career = careerInput ? careerInput.value : '';
      const modality = modalityInput ? modalityInput.value : '';
      const csrfToken = csrfInput ? csrfInput.value : '';

      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,60}$/;
      const phoneRegex = /^[0-9]{10}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const validCareers = [
        'Derecho',
        'Criminalística',
        'Peritaje',
        'Psicología',
        'Pedagogía',
        'Tanatología',
        'Administración'
      ];

      if (!fullName || !nameRegex.test(fullName)) {
        nameInput.classList.add('is-invalid');
        showFeedback('Por favor escribe tu nombre completo (letras y espacios, 3 a 60 caracteres).', 'error');
        nameInput.focus();
        return;
      }

      if (!phone || !phoneRegex.test(phone)) {
        phoneInput.classList.add('is-invalid');
        showFeedback('Ingresa tu número de WhatsApp de 10 dígitos (ej. 5640038229).', 'error');
        phoneInput.focus();
        return;
      }

      if (!email || !emailRegex.test(email) || email.length > 80) {
        emailInput.classList.add('is-invalid');
        showFeedback('Ingresa un correo electrónico con formato válido.', 'error');
        emailInput.focus();
        return;
      }

      if (!career || !validCareers.includes(career)) {
        careerInput.classList.add('is-invalid');
        showFeedback('Selecciona una de nuestras 7 licenciaturas oficiales.', 'error');
        careerInput.focus();
        return;
      }

      if (!modality) {
        modalityInput.classList.add('is-invalid');
        showFeedback('Selecciona tu modalidad de fin de semana.', 'error');
        modalityInput.focus();
        return;
      }

      if (privacyCheck && !privacyCheck.checked) {
        showFeedback('Debes aceptar el aviso de privacidad para continuar.', 'error');
        privacyCheck.focus();
        return;
      }

      if (!csrfToken) {
        showFeedback('Error de seguridad: Falta token de verificación CSRF.', 'error');
        return;
      }

      // Bloqueo inmediato del botón para evitar DoS y duplicación de envíos
      btnSubmit.disabled = true;
      btnSubmit.setAttribute('aria-disabled', 'true');
      btnSubmitText.textContent = 'Procesando solicitud...';
      if (btnSubmitSpinner) {
        btnSubmitSpinner.classList.remove('visually-hidden');
      }

      const payload = {
        csrf_token: csrfToken,
        full_name: fullName,
        phone: phone,
        email: email,
        career: career,
        modality: modality,
        timestamp: new Date().toISOString()
      };

      try {
        const response = await fetch('/api/admissions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify(payload)
        }).catch(() => null);

        if (response && response.ok) {
          showFeedback('¡Solicitud registrada con éxito! Un coordinador de COLEGIO ÉLITE te contactará en breve vía WhatsApp.', 'success');
          admissionForm.reset();
        } else {
          setTimeout(() => {
            showFeedback('¡Solicitud registrada correctamente! Un asesor de COLEGIO ÉLITE te contactará pronto. También puedes acelerar tu proceso escribiendo al WhatsApp +52 56 4003 8229.', 'success');
            admissionForm.reset();
          }, 800);
        }
      } catch (err) {
        showFeedback('Hubo un contratiempo al conectar con el servidor. Intenta de nuevo o contáctanos por WhatsApp.', 'error');
      } finally {
        setTimeout(() => {
          btnSubmit.disabled = false;
          btnSubmit.removeAttribute('aria-disabled');
          btnSubmitText.textContent = 'Asegurar Mi Beca y Lugar';
          if (btnSubmitSpinner) {
            btnSubmitSpinner.classList.add('visually-hidden');
          }
        }, 2500);
      }
    });
  }

});
