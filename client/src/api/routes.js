import { endpoint } from '../util/config';

export const getPollsAPI = `${endpoint}/api`;

export const createPollAPI = `${endpoint}/api`;

export const getPollAPI = (id) => `${endpoint}/api/poll/${id}`;
