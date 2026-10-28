(() => {
  'use strict';
  // This only prevents the password from appearing as readable text in the public repository.
  // GitHub Pages is static hosting, so a client-side login is not server-side security.
  const PASSWORD_SALT = 'MaskSMP-admin-login-v1::a4N7!qL2#P9x';
  const PASSWORD_SHA256 = '824e6a28b91654d811ac323ae2f5d24d533e898bfb5abe9a9963ff463b596430';
  const SESSION_KEY = 'masksmp-admin-session-v2';

  async function hashPassword(value) {
    if (!window.crypto || !window.crypto.subtle || !window.TextEncoder) {
      throw new Error('Secure password verification is unavailable in this context.');
    }
    const bytes = new TextEncoder().encode(`${PASSWORD_SALT}:${value}`);
    const digest = await window.crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const login = document.getElementById('admin-login');
    const shell = document.getElementById('admin-shell');
    const form = document.getElementById('admin-login-form');
    const input = document.getElementById('admin-password');
    const error = document.getElementById('admin-login-error');
    const submit = form.querySelector('button[type="submit"]');

    const unlock = () => {
      sessionStorage.setItem(SESSION_KEY, 'ok');
      login.hidden = true;
      shell.hidden = false;
      document.body.classList.add('admin-authenticated');
    };

    if (sessionStorage.getItem(SESSION_KEY) === 'ok') unlock();

    form.addEventListener('submit', async event => {
      event.preventDefault();
      error.hidden = true;
      const enteredPassword = input.value;
      input.value = '';
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');

      try {
        if (await hashPassword(enteredPassword) === PASSWORD_SHA256) {
          unlock();
        } else {
          error.textContent = 'That password is incorrect. Please try again.';
          error.hidden = false;
          input.focus();
        }
      } catch (verificationError) {
        error.textContent = 'Password verification needs a secure browser context. Open this page on the HTTPS website and try again.';
        error.hidden = false;
        input.focus();
      } finally {
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
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
