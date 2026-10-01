import { escapeHTML } from './html.js';

let toastContainer = null;

function ensureContainer() {
  if (!toastContainer || !document.body.contains(toastContainer)) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'parkora-toast-container';
    toastContainer.className = 'toast-container';
    toastContainer.setAttribute('aria-live', 'polite');
    toastContainer.setAttribute('aria-atomic', 'false');
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

/**
 * Show a non-blocking toast notification
 * @param {string} message - Primary message text
 * @param {'success' | 'error' | 'info' | 'warning'} [type='success'] - Visual variant
 * @param {number} [duration=4000] - Auto-dismiss duration in ms
 */
export function showToast(message, type = 'success', duration = 4000) {
  const container = ensureContainer();

  const iconMap = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info'
  };

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

  // Support Popover API top-layer promotion when available
  const supportsPopover = typeof HTMLElement !== 'undefined' && 'popover' in HTMLElement.prototype;
  if (supportsPopover) {
    toast.setAttribute('popover', 'manual');
  }

  toast.innerHTML = `
    <span class="material-symbols-outlined toast-icon" aria-hidden="true">${iconMap[type] || 'info'}</span>
    <span class="toast-message">${escapeHTML(message)}</span>
    <button type="button" class="toast-close-btn" aria-label="Dismiss notification">&times;</button>
  `;

  container.appendChild(toast);

  if (supportsPopover) {
    try {
      toast.showPopover();
    } catch {
      // Fallback to standard fixed container stacking
    }
  }

  // Trigger entry animation
  requestAnimationFrame(() => {
    toast.classList.add('toast-visible');
  });

  let dismissed = false;
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    toast.classList.remove('toast-visible');
    toast.classList.add('toast-hiding');
    setTimeout(() => {
      if (supportsPopover) {
        try {
          toast.hidePopover();
        } catch {
          // Ignore if already hidden
        }
      }
      toast.remove();
    }, 250);
  };

  const closeBtn = toast.querySelector('.toast-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', dismiss);
  }

  if (duration > 0) {
    setTimeout(dismiss, duration);
  }

  return dismiss;
}
