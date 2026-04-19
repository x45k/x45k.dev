function getUTCOffsetHours() {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en', {
        timeZone: 'America/Winnipeg',
        timeZoneName: 'longOffset'
    });

    const parts = formatter.formatToParts(date);
    const offsetPart = parts.find(part => part.type === 'timeZoneName');

    if (offsetPart && offsetPart.value.includes('GMT')) {
        const match = offsetPart.value.match(/GMT([+-]\d+)/);
        if (match) {
            return parseInt(match[1]) + " (America/Winnipeg)";
        }
    }
    return null;
}

document.getElementById('utc-offset-value').textContent = getUTCOffsetHours();

function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRaindrop(container) {
    const leftPos = randomRange(1, 99);
    const personality = randomRange(1, 98);
    const startOffset = randomRange(2, 8);
    const delay = `0.${personality}s`;
    const duration = `0.5${personality}s`;
    
    const drop = document.createElement('div');
    drop.classList.add('drop');
    drop.style.left = `${leftPos}%`;
    drop.style.bottom = `${startOffset + 100}%`;
    drop.style.animationDelay = delay;
    drop.style.animationDuration = duration;
    
    const stem = document.createElement('div');
    stem.classList.add('stem');
    stem.style.animationDuration = duration;
    
    drop.appendChild(stem);
    container.appendChild(drop);
    
    drop.addEventListener('animationend', () => {
        drop.remove();
        createRaindrop(container);
    });
}

function generateRain() {
    const container = document.querySelector('.rain-root');
    if (!container) throw new Error('rain-root not found');
    const dropCount = 65;
    for (let i = 0; i < dropCount; i++) {
        createRaindrop(container);
    }
}

function createParticle(particleContainer) {
    const particle = document.createElement('div');
    const size = randomRange(1, 4);
    const posX = randomRange(0, 100);
    const duration = randomRange(15, 35);
    const delay = randomRange(0, 20);
    const opacityVal = randomRange(2, 6) / 10;
    
    particle.style.position = 'absolute';
    particle.style.left = `${posX}%`;
    particle.style.bottom = '-10px';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = `rgba(180, 170, 240, ${opacityVal})`;
    particle.style.borderRadius = '50%';
    particle.style.filter = 'blur(0.8px)';
    particle.style.pointerEvents = 'none';
    particle.style.animation = `floatUp ${duration}s linear ${delay}s infinite`;
    
    particleContainer.appendChild(particle);
    
    particle.addEventListener('animationiteration', () => {
        const newLeft = randomRange(0, 100);
        particle.style.left = `${newLeft}%`;
    });
}

function generateFloatingParticles() {
    const container = document.querySelector('.floating-particles');
    if (!container) return;
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.7;
            }
            90% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(-120vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    for (let i = 0; i < 45; i++) {
        createParticle(container);
    }
    setInterval(() => {
        if (container.children.length < 60) {
            createParticle(container);
        }
    }, 2800);
}

function addGlowEffect() {
    const card = document.querySelector('.info-card');
    if (!card) return;
    const glowSpan = document.createElement('div');
    glowSpan.style.position = 'absolute';
    glowSpan.style.inset = '-2px';
    glowSpan.style.borderRadius = '2.6rem';
    glowSpan.style.background = 'radial-gradient(circle at 30% 20%, rgba(140, 120, 240, 0.2), transparent 70%)';
    glowSpan.style.pointerEvents = 'none';
    glowSpan.style.zIndex = '-1';
    glowSpan.style.opacity = '0.6';
    card.style.position = 'relative';
    card.appendChild(glowSpan);
}

function rippleEffectOnSocial() {
    const badges = document.querySelectorAll('.social-badge');
    badges.forEach(badge => {
        badge.addEventListener('click', function(e) {
            if (this.classList.contains('social-badge') && !this.hasAttribute('href')) {
                e.preventDefault();
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fa-regular fa-copy"></i> copied!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 800);
                let username = this.innerText.trim();
                username = username.replace('copied', '').trim();
                if (username && username !== 'copied!') {
                    navigator.clipboard?.writeText(username).catch(() => {});
                }
            }
        });
    });
}

function preCreateVisibleStars() {
    const container = document.querySelector('.floating-particles');
    if (!container) return;
    const existingParticles = container.children;
    for (let i = 0; i < existingParticles.length; i++) {
        const particle = existingParticles[i];
        const randomProgress = randomRange(5, 95);
        particle.style.animationDelay = `-${randomProgress}s`;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        generateRain();
        generateFloatingParticles();
        setTimeout(() => preCreateVisibleStars(), 10);
        addGlowEffect();
        rippleEffectOnSocial();
    });
} else {
    generateRain();
    generateFloatingParticles();
    setTimeout(() => preCreateVisibleStars(), 10);
    addGlowEffect();
    rippleEffectOnSocial();
}