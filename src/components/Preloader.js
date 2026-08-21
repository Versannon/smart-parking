import gsap from 'gsap';

export function createPreloader(onComplete) {
  const container = document.createElement('div');
  container.id = 'preloader';

  container.innerHTML = `
    <div class="radar-container">
      <div class="radar-ring"></div>
      <div class="radar-ring"></div>
      <div class="radar-ring"></div>
      <div class="radar-crosshair-h"></div>
      <div class="radar-crosshair-v"></div>
      <div class="radar-sweep"></div>
      <div class="radar-spot radar-spot-1"></div>
      <div class="radar-spot radar-spot-2"></div>
      <div class="radar-spot radar-spot-3"></div>
      <div class="radar-center-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.7 2 11 2 11.3V16c0 .6.4 1 1 1h2"/>
          <circle cx="7" cy="17" r="2"/>
          <path d="M9 17h6"/>
          <circle cx="17" cy="17" r="2"/>
        </svg>
      </div>
    </div>
    
    <div class="preloader-status" id="preloader-text">
      Scanning nearby <span>Metro & Work</span> parking spots...
    </div>

    <div class="progress-track">
      <div class="progress-fill" id="preloader-fill"></div>
    </div>

    <div style="margin-top: 12px; font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);" id="preloader-percent">
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
        duration: 0.6,
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
