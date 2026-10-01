import gsap from 'gsap';

export function createPreloader(onComplete) {
  const params = new URLSearchParams(window.location.search);
  const forceFull = params.get('preloader') === '1';
  const alreadyShown = sessionStorage.getItem('parkora_preloader_shown') === 'true';

  // Full 2.6s radar sweep on first visit (or 4s if forced via ?preloader=1), fast 0.6s on repeat reloads
  const durationSeconds = forceFull ? 4.0 : alreadyShown ? 0.65 : 2.4;
  sessionStorage.setItem('parkora_preloader_shown', 'true');

  const container = document.createElement('div');
  container.id = 'preloader';
  container.setAttribute('role', 'status');
  container.setAttribute('aria-live', 'polite');
  container.setAttribute('aria-label', 'Loading Parkora smart parking platform');

  container.innerHTML = `
    <div class="preloader-radar-wrapper" aria-hidden="true">
      <div class="radar-ring-light"></div>
      <div class="radar-ring-light"></div>
      <div class="radar-ring-light"></div>
      <div class="radar-sweep-light"></div>
      <div class="radar-center-dot"></div>
    </div>
    
    <div class="preloader-text-status" id="preloader-text">
      Scanning nearby <span>Metro &amp; Work</span> parking spots...
    </div>

    <div class="progress-track-light" aria-hidden="true">
      <div class="progress-fill-light" id="preloader-fill"></div>
    </div>

    <div class="preloader-footer-row">
      <div class="preloader-percent-label" id="preloader-percent">0%</div>
      <button type="button" class="preloader-skip-btn" id="preloader-skip-btn">Skip Intro &rarr;</button>
    </div>
  `;

  document.body.appendChild(container);

  const fillEl = container.querySelector('#preloader-fill');
  const percentEl = container.querySelector('#preloader-percent');
  const textEl = container.querySelector('#preloader-text');
  const skipBtn = container.querySelector('#preloader-skip-btn');

  const statusMessages = [
    'Scanning nearby <span>Metro &amp; Work</span> parking spots...',
    'Verifying <span>EV Charging</span> &amp; Covered slots...',
    'Calculating real-time <span>distance &amp; rates</span>...',
    'Locking optimal <span>Parkora slot</span>...'
  ];

  let finished = false;
  const finishPreloader = () => {
    if (finished) return;
    finished = true;
    tl.kill();
    textEl.innerHTML = '<span>Welcome to Parkora!</span>';
    percentEl.textContent = '100%';
    fillEl.style.width = '100%';

    gsap.to(container, {
      opacity: 0,
      duration: 0.35,
      onComplete: () => {
        container.classList.add('fade-out');
        container.remove();
        if (onComplete) onComplete();
      }
    });
  };

  const obj = { progress: 0 };
  const tl = gsap.timeline({
    onComplete: finishPreloader
  });

  if (skipBtn) {
    skipBtn.addEventListener('click', finishPreloader);
  }

  tl.to(obj, {
    progress: 100,
    duration: durationSeconds,
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
