/**
 * Contact Form Module
 * Handles client-side constraint validation and submission to Web3Forms endpoint.
 */

export function initContactForm() {
  const form = document.querySelector('#contactForm');
  if (!form) return;

  const statusAlert = document.querySelector('#formStatusAlert');

  function showError(input, message) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    const errorMsgEl = group.querySelector('.form-error-msg');
    if (errorMsgEl) {
      errorMsgEl.textContent = message;
    }
  }

  function clearError(input) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.remove('has-error');
  }

  // Real-time validation on blur
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group && group.classList.contains('has-error')) {
        validateField(input);
      }
    });
  });

  function validateField(input) {
    if (input.type === 'hidden') return true;

    if (input.required && !input.value.trim()) {
      showError(input, 'This field is required.');
      return false;
    }

    if (input.type === 'email' && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        showError(input, 'Please enter a valid email address.');
        return false;
      }
    }

    clearError(input);
    return true;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    // Honeypot check (checkbox is checked by bots)
    const honeypot = form.querySelector('input[name="botcheck"]');
    if (honeypot && (honeypot.checked || (honeypot.type !== 'checkbox' && honeypot.value))) {
      return; // Silent fail for bots
    }

    if (!isValid) {
      if (statusAlert) {
        statusAlert.className = 'form-status-alert error';
        statusAlert.textContent = 'Please fix the errors in the form before submitting.';
        statusAlert.focus();
      }
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
      }

      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const result = await response.json();

      if (response.status === 200) {
        if (statusAlert) {
          statusAlert.className = 'form-status-alert success';
          statusAlert.textContent = 'Thank you! Your message has been sent successfully. We will get back to you shortly.';
        }
        form.reset();
      } else {
        throw new Error(result.message || 'Form submission failed.');
      }
    } catch (err) {
      if (statusAlert) {
        statusAlert.className = 'form-status-alert error';
        statusAlert.textContent = 'Oops! There was a problem sending your message. Please try again or email us directly at afezolalekanalimi@gmail.com.';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
}
