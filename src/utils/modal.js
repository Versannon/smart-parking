// Accessible Modal Manager — Focus Trap, Escape Key, Backdrop Light-Dismiss & Scroll Lock

let lastFocusedElement = null;
let keydownBound = false;

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

function getActiveModal() {
  const activeModals = document.querySelectorAll('.modal-overlay-backdrop.active');
  return activeModals.length > 0 ? activeModals[activeModals.length - 1] : null;
}

function updateScrollLock() {
  const anyActive = Boolean(getActiveModal());
  document.body.style.overflow = anyActive ? 'hidden' : '';
}

function handleGlobalKeydown(e) {
  const activeModal = getActiveModal();
  if (!activeModal) return;

  if (e.key === 'Escape') {
    e.preventDefault();
    closeModal(activeModal);
    return;
  }

  if (e.key === 'Tab') {
    const focusables = Array.from(activeModal.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
      el => el.offsetParent !== null
    );
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first || !activeModal.contains(document.activeElement)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last || !activeModal.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  }
}

export function initModalAccessibility() {
  if (!keydownBound) {
    document.addEventListener('keydown', handleGlobalKeydown);
    keydownBound = true;
  }

  // Watch for class changes on .modal-overlay-backdrop so even legacy .classList.add('active') calls get focus trap & scroll lock
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes' && m.attributeName === 'class') {
        const el = /** @type {HTMLElement} */ (m.target);
        if (el.classList.contains('modal-overlay-backdrop')) {
          const isOpen = el.classList.contains('active');
          el.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
          updateScrollLock();
          if (isOpen) {
            requestAnimationFrame(() => {
              const firstInput = el.querySelector('input:not([disabled]), select:not([disabled]), button:not(.modal-close-icon):not([disabled]), .modal-close-icon');
              if (firstInput && typeof firstInput.focus === 'function') {
                firstInput.focus();
              }
            });
          } else if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
            lastFocusedElement = null;
          }
        }
      }
    }
  });

  document.querySelectorAll('.modal-overlay-backdrop').forEach(modal => {
    modal.setAttribute('aria-hidden', modal.classList.contains('active') ? 'false' : 'true');
    observer.observe(modal, { attributes: true, attributeFilter: ['class'] });

    // Ensure backdrop click closes the modal
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });
}

export function openModal(modalEl) {
  if (!modalEl) return;
  if (document.activeElement instanceof HTMLElement) {
    lastFocusedElement = document.activeElement;
  }
  modalEl.classList.add('active');
}

export function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove('active');
}
