document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeMobileAnimations();
    initializeButtonEffects();
    initializeParticles();
    initializeUtilityFeatures();

    function initializeMobileAnimations() {
        // Animate card entrance
        const card = document.getElementById('main-card');
        if (card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) scale(0.95)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 150);
        }

        // Typing effect for description
        setTimeout(() => {
            createTypingEffect();
        }, 1200);
    }
    
    function initializeButtonEffects() {
        // Add animation to all buttons
        const buttons = document.querySelectorAll('.btn, .social-link');
        
        buttons.forEach(button => {
            // Add pulse animation to all buttons
            setInterval(() => {
                button.classList.add('pulse-animation');
                setTimeout(() => {
                    button.classList.remove('pulse-animation');
                }, 2000);
            }, 8000);

            // Touch/click effects
            button.addEventListener('touchstart', function(e) {
                this.style.transform = 'scale(0.95)';
                createRippleEffect(this, e.touches ? e.touches[0] : null);
            });
            
            button.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
            
            button.addEventListener('click', function(e) {
                if (!this.getAttribute('href')) {
                    e.preventDefault();
                    showSuccessMessage('Amal bajarilmoqda...', '🔄');
                }
            });
        });

        // Special handling for action buttons
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', function() {
                handleButtonAction(this);
            });
        });
    }
    
    function createRippleEffect(button, touch) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = (touch?.clientX || rect.left + rect.width/2) - rect.left - size / 2;
        const y = (touch?.clientY || rect.top + rect.height/2) - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    function handleButtonAction(button) {
        const action = button.dataset.action;
        
        // Add loading state
        button.classList.add('loading');
        
        switch(action) {
            case 'catalog':
                showSuccessMessage('Katalog yuklanmoqda...', '📱');
                setTimeout(() => {
                    showCatalogModal();
                }, 1000);
                break;
                
            case 'location':
                showSuccessMessage('Manzil ochilmoqda...', '📍');
                setTimeout(() => {
                    window.open('https://maps.google.com/?q=Tashkent,Uzbekistan', '_blank');
                }, 800);
                break;
        }
        
        // Remove loading state
        setTimeout(() => {
            button.classList.remove('loading');
        }, 1000);
    }
    
    function initializeParticles() {
        const particleContainer = document.getElementById('particles-container');
        if (!particleContainer) return;
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            particle.style.width = particle.style.height = (Math.random() * 3 + 2) + 'px';
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 5000);
        }
        
        // Create initial particles
        for (let i = 0; i < 50; i++) {
            createParticle();
        }
        
        // Create particles periodically
        setInterval(createParticle, 3000);
    }
    
    function initializeUtilityFeatures() {
        // Time display
        updateTime();
        setInterval(updateTime, 1000);
    }
    
    function createTypingEffect() {
        const description = document.getElementById('description');
        if (!description) return;
        
        const originalText = description.textContent;
        description.textContent = '';
        description.style.borderRight = '2px solid #3b82f6';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                description.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            } else {
                setTimeout(() => {
                    description.style.borderRight = 'none';
                }, 1000);
            }
        };
        typeWriter();
    }
    
    function showSuccessMessage(message, icon = '✅') {
        const successEl = document.getElementById('success-template');
        if (!successEl) return;
        
        const clone = successEl.cloneNode(true);
        clone.id = 'success-' + Date.now();
        clone.querySelector('.message-text').textContent = message;
        
        // Set icon
        const iconEl = clone.querySelector('i');
        iconEl.className = icon.startsWith('fa-') ? 'fas ' + icon : 'fas fa-check-circle';
        
        document.body.appendChild(clone);
        
        setTimeout(() => {
            clone.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            clone.classList.remove('show');
            setTimeout(() => {
                clone.remove();
            }, 300);
        }, 2500);
    }
    
    function showCatalogModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 24px;
                border-radius: 16px;
                max-width: 90%;
                text-align: center;
                transform: scale(0.8);
                transition: transform 0.3s;
            ">
                <h3 style="margin-bottom: 16px; color: #1e293b;">Katalog</h3>
                <p style="margin-bottom: 24px; color: #64748b;">
                    Bizning mahsulotlar katalogi tez orada tayyorlanadi!
                </p>
                <button style="
                    background: #3b82f6;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                ">Yopish</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('div').style.transform = 'scale(1)';
        }, 100);
        
        // Close button handler
        modal.querySelector('button').addEventListener('click', () => {
            modal.remove();
        });
    }
    
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('uz-UZ', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        const timeDisplay = document.getElementById('time-display');
        if (timeDisplay) {
            timeDisplay.textContent = `Hozirgi vaqt: ${timeString}`;
        }
    }
});

// Prevent zoom on double tap (iOS Safari)
document.addEventListener('touchend', function (event) {
    const now = Date.now();
    if (now - (this.lastTouchEnd || 0) <= 300) {
        event.preventDefault();
    }
    this.lastTouchEnd = now;
}, false);