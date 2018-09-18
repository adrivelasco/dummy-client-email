import request from '../utils/request';

/**
 * Fetch all the emails
 */
export function getAllEmails() {
  return request('/api/emails');
}

/**
 * Fetch an email by id
 * @param {String|Number} id - Email id
 */
export function getEmailById(id) {
  return request(`/api/emails/${id}`);
}
