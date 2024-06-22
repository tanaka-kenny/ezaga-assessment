
export const setEmail =  (email: string) => localStorage.setItem('email', email);
export const getEmail = () => localStorage.getItem('email');
export const removeEmail = () => localStorage.removeItem('email');

export const setAccessToken = (token: string) => localStorage.setItem('access_token', token);
export const removeAccessToken = () => localStorage.removeItem('access_token')

