import request from '../utils/request';

/**
 * Login user
 */
export function login({ email, password }) {
  return request('/api/login', {
    method: 'POST',
    body: {
      email,
      password
    }
  });
}

/**
 * Logout user
 */
export function logout() {
  return request('/api/logout');
}
