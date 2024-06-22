
export const setEmail =  (email: string) => localStorage.setItem('email', email);

export const getEmail = () => localStorage.getItem('email');

export const setAccessToken = (token: string) => localStorage.setItem('access_token', token);