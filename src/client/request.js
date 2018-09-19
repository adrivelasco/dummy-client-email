require('es6-promise').polyfill();
require('isomorphic-fetch');

/**
 * Parses the JSON returned by a network request
 * @param {object} response - A response from a network request
 * @returns {object} The parsed JSON from the request
 */
export function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 * @param {Object} response - A response from a network request
 * @returns {Object|undefined} Returns either the response, or throws an error
 */
export async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = await response.json();
  error.statusCode = response.status;
  throw error;
}

/**
 * Requests a URL, returning a promise
 * @param {String} url - The URL we want to request
 * @param {Object} [options] - The options we want to pass to "fetch"
 * @returns {Object} The response data
 */
export default function request(url, options = {}) {
  options.credentials = 'same-origin';
  options.mode = 'cors';
  options.cache = 'default';
  options.body = JSON.stringify(options.body);
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  options.headers = headers;
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}
