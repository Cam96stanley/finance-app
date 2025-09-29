import api from './api';

export const signIn = (payload: { email: string; password: string }) => {
  return api.post('/auth/login', payload);
};

export const signUp = (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post('/auth/signup', payload);
};

export const confirmEmail = (payload: { email: string; code: string }) => {
  return api.post('/auth/confirm-signup', payload);
};
