(() => {
  'use strict';
  // SHA-256 verifier hides the plain-text password from this file, but GitHub Pages is static:
  // this remains only a basic gate, not real server-side authentication.
  const PASSWORD_SHA256 = '78f87e37bbbb99e81dfe357e249c1128813560e5470c73b8b077393940ab8311';
  const SESSION_KEY = 'masksmp-admin-session-v2';

  const sha256 = async value => {
    if (!globalThis.crypto?.subtle) throw new Error('Secure password checking requires HTTPS.');
    const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
  };

  document.addEventListener('DOMContentLoaded', () => {
    const login = document.getElementById('admin-login');
    const shell = document.getElementById('admin-shell');
    const form = document.getElementById('admin-login-form');
    const input = document.getElementById('admin-password');
    const error = document.getElementById('admin-login-error');
    const unlock = () => {
      sessionStorage.setItem(SESSION_KEY, 'ok');
      login.hidden = true;
      shell.hidden = false;
      document.body.classList.add('admin-authenticated');
    };
    if (sessionStorage.getItem(SESSION_KEY) === 'ok') unlock();
    form.addEventListener('submit', async event => {
      event.preventDefault();
      try {
        if (await sha256(input.value) === PASSWORD_SHA256) {
          error.hidden = true;
          input.value = '';
          unlock();
        } else {
          error.hidden = false;
          input.value = '';
          input.focus();
        }
      } catch (_) {
        error.textContent = 'Secure password checking requires HTTPS. Open this admin through your HTTPS website address.';
        error.hidden = false;
        input.value = '';
        input.focus();
      }
    });
    document.getElementById('admin-logout')?.addEventListener('click', () => {
      sessionStorage.removeItem(SESSION_KEY);
      shell.hidden = true;
      login.hidden = false;
      document.body.classList.remove('admin-authenticated');
      input.value = '';
      input.focus();
    });
  });
})();
