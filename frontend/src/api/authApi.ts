import api from './api';

export const signIn = (payload: { email: string; password: string }) => {
  return api.post('/auth/login', payload);
};
