/**
 * API client for S-Bill Authentication and Invoicing Backend
 */

async function handleResponse(res, defaultError) {
  const text = await res.text();

  if (!res.ok) {
    // Check if error is JSON (from Vite proxy or Spring)
    try {
      const json = JSON.parse(text);
      if (json.error || json.message) {
        throw new Error(json.error || json.message);
      }
    } catch (e) {
      if (e.message && !e.message.startsWith('Unexpected token')) {
        throw e;
      }
    }

    if (res.status === 500 || res.status === 503 || res.status === 502) {
      if (text.includes('MailAuthenticationException') || text.includes('AuthenticationFailedException') || text.includes('535') || text.includes('Username and Password not accepted')) {
        throw new Error('Account created in database, but Gmail SMTP rejected the email credentials. Set a valid GMAIL_APP_PASSWORD in backend to send real emails.');
      }
      if (!text || text.includes('ECONNREFUSED') || text.includes('Proxy error') || text.includes('<!doctype') || text.includes('<html')) {
        throw new Error('Backend server is offline. Please start Spring Boot on port 8080 (.\\mvnw.cmd spring-boot:run).');
      }
    }

    throw new Error(text || defaultError);
  }

  return text;
}

export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const res = await fetch('/api/invoice/signin', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
      signal: controller.signal 
    });
    clearTimeout(timeout);
    return res.status === 401 || res.status === 200;
  } catch {
    return false;
  }
}

export async function signIn({ email, password }) {
  try {
    const res = await fetch('/api/invoice/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const message = await handleResponse(res, 'Failed to sign in');
    return { success: true, message, email };
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Cannot reach backend server. Make sure Spring Boot is running on port 8080.');
    }
    throw err;
  }
}

export async function signUp({ name, email, password, phoneNumber, address, businessName }) {
  try {
    const res = await fetch('/api/invoice/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phoneNumber, address, businessName }),
    });

    const message = await handleResponse(res, 'Registration failed');
    return { success: true, message, email };
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Cannot reach backend server. Make sure Spring Boot is running on port 8080.');
    }
    throw err;
  }
}

export async function verifyEmail({ email, code }) {
  try {
    const url = `/api/invoice/verify?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`;
    const res = await fetch(url, {
      method: 'POST',
    });

    const message = await handleResponse(res, 'Verification failed');
    return { success: true, message };
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Cannot reach backend server. Make sure Spring Boot is running on port 8080.');
    }
    throw err;
  }
}

export const OAUTH_GOOGLE_URL = '/oauth2/authorization/google';
export const OAUTH_FACEBOOK_URL = '/oauth2/authorization/facebook';
