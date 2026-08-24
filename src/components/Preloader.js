import gsap from 'gsap';

export function createPreloader(onComplete) {
  const container = document.createElement('div');
  container.id = 'preloader';

  container.innerHTML = `
    <div class="preloader-radar-wrapper">
      <div class="radar-ring-light"></div>
      <div class="radar-ring-light"></div>
      <div class="radar-ring-light"></div>
      <div class="radar-sweep-light"></div>
      <div class="radar-center-dot"></div>
    </div>
    
    <div class="preloader-text-status" id="preloader-text">
      Scanning nearby <span>Metro & Work</span> parking spots...
    </div>

    <div class="progress-track-light">
      <div class="progress-fill-light" id="preloader-fill"></div>
    </div>

    <div style="margin-top: 12px; font-family: var(--font-mono); font-size: 13px; font-weight: 600; color: var(--on-surface-variant);" id="preloader-percent">
      0%
    </div>
  `;

  document.body.appendChild(container);

  // GSAP 4-Second Animation Timeline
  const fillEl = container.querySelector('#preloader-fill');
  const percentEl = container.querySelector('#preloader-percent');
  const textEl = container.querySelector('#preloader-text');

  const statusMessages = [
    'Scanning nearby <span>Metro & Work</span> parking spots...',
    'Verifying <span>EV Charging</span> & Covered slots...',
    'Calculating real-time <span>distance & rates</span>...',
    'Locking optimal <span>Parkora slot</span>...'
  ];

  const obj = { progress: 0 };

  const tl = gsap.timeline({
    onComplete: () => {
      textEl.innerHTML = '<span>Welcome to Parkora!</span>';
      percentEl.textContent = '100%';
      
      gsap.to(container, {
        opacity: 0,
        duration: 0.5,
        delay: 0.2,
        onComplete: () => {
          container.classList.add('fade-out');
          container.remove();
          if (onComplete) onComplete();
        }
      });
    }
  });

  tl.to(obj, {
    progress: 100,
    duration: 4.0, // Exactly 4 Seconds
    ease: 'power1.inOut',
    onUpdate: () => {
      const current = Math.floor(obj.progress);
      fillEl.style.width = `${current}%`;
      percentEl.textContent = `${current}%`;

      if (current < 25) {
        textEl.innerHTML = statusMessages[0];
      } else if (current < 50) {
        textEl.innerHTML = statusMessages[1];
      } else if (current < 75) {
        textEl.innerHTML = statusMessages[2];
      } else {
        textEl.innerHTML = statusMessages[3];
      }
    }
  });

  return container;
}
