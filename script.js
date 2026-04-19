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
    
    const splat = document.createElement('div');
    splat.classList.add('splat');
    splat.style.animationDuration = duration;
    
    drop.appendChild(stem);
    drop.appendChild(splat);
    container.appendChild(drop);
    
    drop.addEventListener('animationend', () => {
        drop.remove();
        createRaindrop(container);
    });
}

function generateRain() {
    const container = document.querySelector('.rain-root');
    if (!container) throw new Error('rain-root not found');
    const dropCount = 55;
    for (let i = 0; i < dropCount; i++) {
        createRaindrop(container);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateRain);
} else {
    generateRain();
}