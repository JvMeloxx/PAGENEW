// Timer regressivo
function startTimer() {
    // Define o tempo inicial (8 horas em segundos)
    let timeLeft = 8 * 60 * 60; // 8 horas
    
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    function updateTimer() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            // Reinicia o timer quando chega a zero
            timeLeft = 8 * 60 * 60;
        }
    }
    
    // Atualiza o timer imediatamente
    updateTimer();
    
    // Atualiza a cada segundo
    setInterval(updateTimer, 1000);
}

// Animações de scroll
function handleScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scroll para âncoras
function handleSmoothScroll() {
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

// Adiciona efeito de hover nos botões CTA
function enhanceCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Adiciona efeito de clique
        button.addEventListener('click', function(e) {
            // Agora os botões têm links reais, não precisamos prevenir o comportamento padrão
            // O link do WhatsApp será aberto normalmente
        });
    });
}

// Adiciona partículas flutuantes no hero
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
            z-index: 1;
        `;
        hero.appendChild(particle);
    }
    
    // Adiciona CSS para animação das partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 0.7;
            }
            100% {
                transform: translateY(-20px) rotate(180deg);
                opacity: 0.3;
            }
        }
    `;
    document.head.appendChild(style);
}

// Adiciona efeito de digitação no título
function typewriterEffect() {
    const title = document.querySelector('.hero-title');
    const originalHTML = title.innerHTML;
    const textContent = '🔥 Últimas vagas para entrar no grupo secreto de Achadinhos Shopee & Amazon!';
    title.innerHTML = '';
    title.style.borderRight = '2px solid #ffeb3b';
    
    let i = 0;
    function typeWriter() {
        if (i < textContent.length) {
            const currentText = textContent.substring(0, i + 1);
            // Aplica o highlight apenas na parte "Achadinhos Shopee & Amazon!"
            if (currentText.includes('Achadinhos Shopee & Amazon!')) {
                const beforeHighlight = currentText.substring(0, currentText.indexOf('Achadinhos'));
                const highlightText = currentText.substring(currentText.indexOf('Achadinhos'));
                title.innerHTML = beforeHighlight + '<span class="highlight">' + highlightText + '</span>';
            } else {
                title.innerHTML = currentText;
            }
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Restaura o HTML original com o highlight correto
            title.innerHTML = '🔥 Últimas vagas para entrar no grupo secreto de <span class="highlight">Achadinhos Shopee & Amazon!</span>';
            title.style.borderRight = 'none';
        }
    }
    
    // Inicia o efeito após um pequeno delay
    setTimeout(typeWriter, 500);
}

// Adiciona contador de visitantes fake
function addVisitorCounter() {
    const hero = document.querySelector('.hero-content');
    const counter = document.createElement('div');
    counter.className = 'visitor-counter';
    counter.style.cssText = `
        background: rgba(255, 255, 255, 0.1);
        padding: 10px 20px;
        border-radius: 25px;
        margin-top: 20px;
        font-size: 0.9rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    const baseCount = 1247;
    const currentCount = baseCount + Math.floor(Math.random() * 50);
    counter.innerHTML = `🔥 ${currentCount} pessoas visualizando agora`;
    
    hero.appendChild(counter);
    
    // Atualiza o contador a cada 10 segundos
    setInterval(() => {
        const newCount = baseCount + Math.floor(Math.random() * 50);
        counter.innerHTML = `🔥 ${newCount} pessoas visualizando agora`;
    }, 10000);
}

// Função para rastrear eventos de leads
function trackLeadEvents() {
    // Rastrear cliques no botão principal CTA
    const mainCTA = document.getElementById('main-cta');
    if (mainCTA) {
        mainCTA.addEventListener('click', function() {
            // Vercel Analytics
            if (window.va) {
                window.va('track', 'Lead Click', {
                    button: 'main-cta',
                    location: 'hero-section',
                    timestamp: new Date().toISOString()
                });
            }
            
            // Facebook Pixel - InitiateCheckout (clique no WhatsApp)
            if (window.fbq) {
                window.fbq('track', 'InitiateCheckout', {
                    content_name: 'WhatsApp CTA Click',
                    content_category: 'Lead Generation',
                    value: 1,
                    currency: 'BRL'
                });
            }
        });
    }
    
    // Rastrear cliques em todos os botões CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Vercel Analytics
            if (window.va) {
                window.va('track', 'CTA Click', {
                    button_index: index,
                    button_text: button.textContent.trim(),
                    timestamp: new Date().toISOString()
                });
            }
            
            // Facebook Pixel - InitiateCheckout para todos os CTAs
            if (window.fbq) {
                window.fbq('track', 'InitiateCheckout', {
                    content_name: button.textContent.trim(),
                    content_category: 'CTA Button',
                    value: 1,
                    currency: 'BRL'
                });
            }
        });
    });
    
    // Rastrear tempo na página (engajamento)
    let timeOnPage = 0;
    const timeTracker = setInterval(() => {
        timeOnPage += 10;
        
        // Marcos de tempo importantes para leads
        if (timeOnPage === 30 && window.va) {
            window.va('track', 'Engagement', { time_on_page: '30_seconds' });
        }
        if (timeOnPage === 60 && window.va) {
            window.va('track', 'Engagement', { time_on_page: '1_minute' });
        }
        if (timeOnPage === 120 && window.va) {
            window.va('track', 'Engagement', { time_on_page: '2_minutes' });
        }
    }, 10000); // A cada 10 segundos
    
    // Rastrear scroll profundo (interesse)
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Marcos de scroll importantes
            if (maxScroll >= 25 && maxScroll < 50 && window.va) {
                window.va('track', 'Scroll Depth', { depth: '25_percent' });
            }
            if (maxScroll >= 50 && maxScroll < 75 && window.va) {
                window.va('track', 'Scroll Depth', { depth: '50_percent' });
            }
            if (maxScroll >= 75 && window.va) {
                window.va('track', 'Scroll Depth', { depth: '75_percent' });
            }
        }
    });
}

// Função para simular evento Lead (quando preenche formulário)
function trackLeadFormSubmission() {
    // Como não há formulário real, vamos simular com base em engajamento alto
    let highEngagementTracked = false;
    
    // Rastrear Lead baseado em tempo na página + scroll profundo
    setTimeout(() => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent >= 50 && !highEngagementTracked) {
            highEngagementTracked = true;
            
            // Facebook Pixel - Lead (engajamento alto)
            if (window.fbq) {
                window.fbq('track', 'Lead', {
                    content_name: 'High Engagement Lead',
                    content_category: 'Lead Generation',
                    value: 5,
                    currency: 'BRL'
                });
            }
        }
    }, 30000); // Após 30 segundos na página
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    startTimer();
    handleScrollAnimations();
    handleSmoothScroll();
    enhanceCTAButtons();
    createFloatingParticles();
    addVisitorCounter();
    trackLeadEvents(); // Inicializar rastreamento de leads
    trackLeadFormSubmission(); // Inicializar rastreamento de leads por engajamento
    
    // Adiciona efeito de digitação após um delay
    setTimeout(typewriterEffect, 1000);
    
    // Adiciona classe para animações CSS
    document.body.classList.add('loaded');
    
    // Rastrear carregamento da página - Vercel Analytics
    if (window.va) {
        window.va('track', 'Page Load', {
            page: 'landing-page',
            timestamp: new Date().toISOString()
        });
    }
    
    // Facebook Pixel PageView já é disparado automaticamente no HTML
});

// Adiciona efeito de parallax suave
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Previne o comportamento padrão dos links enquanto não há URL real
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href="#"]')) {
        e.preventDefault();
    }
});