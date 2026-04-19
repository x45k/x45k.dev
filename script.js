function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const container = document.querySelector('.rain-root');
// if (!container) throw new Error('No .rain-root elememt');

let leftOffset = 0;
while (leftOffset < 100) {
    const d = randomInt(1, 98);
    const groupSize = randomInt(2, 3);
    leftOffset += groupSize;
    if (leftOffset > 100) break;

    const delay = `0.${d}s`;
    const duration = `0.5${d}s`;

    const drop = document.createElement('div');
    drop.classList.add('drop');
    drop.style.left = `${leftOffset}%`;
    drop.style.bottom = `${groupSize + 100}%`;
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
}