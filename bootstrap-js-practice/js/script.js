// Sistema principal para la Fanbase de Ataque a los Titanes
class TitanFanbase {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuthentication();
    }

    setupEventListeners() {
        // Formulario de login/registro
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Funcionalidades del Modal
        const openExampleBtn = document.getElementById('openExampleBtn');
        if (openExampleBtn) {
            openExampleBtn.addEventListener('click', () => this.showExpeditionModal());
        }

        // Control de los modales
        const modalClose = document.getElementById('modalClose');
        const modalOk = document.getElementById('modalOk');
        const modalCancel = document.getElementById('modalCancel');

        if (modalClose) modalClose.addEventListener('click', () => this.hideModal());
        if (modalOk) modalOk.addEventListener('click', () => this.handleModalConfirm());
        if (modalCancel) modalCancel.addEventListener('click', () => this.hideModal());

        // Funcionalidades del Dashboard 
        const logoutBtn = document.getElementById('logoutBtn');
        const dangerAction = document.getElementById('dangerAction');

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        if (dangerAction) {
            dangerAction.addEventListener('click', () => this.showDangerModal());
        }

        // Cerrar modal al hacer clic fuera
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('customModal');
            if (e.target === modal) {
                this.hideModal();
            }
        });

        // Navegación tranqui
        this.setupSmoothScrolling();
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const form = e.target;
        
        // Validación básica
        if (!this.validateForm(form)) {
            this.showAlert('Por favor, corrige los errores en el formulario', 'warning');
            return;
        }
        
        // Credenciales de prueba
        const testAccounts = {
            'recluta@paradis.com': '123456',
            'scouts@paradis.com': '123456',
            'levi@paradis.com': '123456'
        };
        
        if (testAccounts[email] && testAccounts[email] === password) {
            this.showAlert('🎉 ¡Bienvenido a la Legión de Reconocimiento! Acceso concedido.', 'success');
            
            // Simular redirección al dashboard después de 2 segundos
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
            
            // Guardar sesión (simulado)
            localStorage.setItem('titan_auth', 'true');
            localStorage.setItem('titan_user', email);
            
        } else {
            this.showAlert('❌ Credenciales incorrectas. Usa: recluta@paradis.com / 123456', 'danger');
        }
    }

    validateForm(form) {
        let isValid = true;
        
        // Remover validaciones previas
        form.classList.remove('was-validated');
        
        // Validar campos
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        
        if (!email.value || !this.isValidEmail(email.value)) {
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
        }
        
        if (!password.value || password.value.length < 6) {
            password.classList.add('is-invalid');
            isValid = false;
        } else {
            password.classList.remove('is-invalid');
            password.classList.add('is-valid');
        }
        
        form.classList.add('was-validated');
        return isValid;
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showAlert(message, type = 'danger', timeout = 5000) {
        const alertContainer = document.getElementById('alertContainer');
        if (!alertContainer) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = `alert alert-${type} alert-dynamic alert-dismissible fade show`;
        wrapper.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        alertContainer.appendChild(wrapper);
        
        // Auto-remover después del timeout
        if (timeout) {
            setTimeout(() => {
                if (wrapper.parentNode) {
                    wrapper.remove();
                }
            }, timeout);
        }
    }

    showExpeditionModal() {
        this.showModal(
            '🏰 Iniciar Expedición', 
            '¿Estás preparado para explorar más allá de los muros? Esta expedición revelará secretos sobre los Titanes y la verdad del mundo exterior. El camino es peligroso, pero la verdad vale cualquier riesgo.'
        );
    }

    showDangerModal() {
        this.showModal(
            '⚠️ Misión Peligrosa', 
            'Esta operación tiene un alto riesgo de bajas. Solo los soldados más experimentados deberían continuar. ¿Estás preparado para ofrecer tu corazón por la humanidad?'
        );
    }

    showModal(title, message) {
        const modal = document.getElementById('customModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        
        if (modal && modalTitle && modalBody) {
            modalTitle.textContent = title;
            modalBody.textContent = message;
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            
            // Agregar animación de entrada
            modal.style.animation = 'modalFadeIn 0.3s ease';
        }
    }

    hideModal() {
        const modal = document.getElementById('customModal');
        if (modal) {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    handleModalConfirm() {
        this.showAlert('🎯 ¡Expedición iniciada! Prepara tu equipo de maniobra tridimensional.', 'success');
        this.hideModal();
    }

    handleLogout() {
        if (confirm('¿Estás seguro de que quieres abandonar el cuartel?')) {
            localStorage.removeItem('titan_auth');
            localStorage.removeItem('titan_user');
            this.showAlert('👋 Sesión cerrada. ¡Vuelve pronto, soldado!', 'info');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    }

    checkAuthentication() {
        // En el dashboard, verificar si el usuario está autenticado
        if (window.location.pathname.includes('dashboard.html')) {
            const isAuthenticated = localStorage.getItem('titan_auth');
            if (!isAuthenticated) {
                this.showAlert('🔒 Debes iniciar sesión primero', 'warning');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                // Mostrar información del usuario
                const user = localStorage.getItem('titan_user');
                console.log(`Usuario autenticado: ${user}`);
            }
        }
    }

    // Efectos visuales adicionales
    addHoverEffects() {
        // Agregar efectos hover a todas las cards
        document.querySelectorAll('.titan-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new TitanFanbase();
});

// Efectos de partículas simples para el fondo (opcional)
function initParticles() {
    const header = document.querySelector('.titan-header');
    if (!header) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(139, 0, 0, 0.3);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float 6s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        header.appendChild(particle);
    }
}

// Agregar animación flotante
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
        50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
    }
`;
document.head.appendChild(style);

// Inicializar efectos cuando la página cargue
window.addEventListener('load', initParticles);