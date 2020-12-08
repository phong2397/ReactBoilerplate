export const saveAccessToken = token => {
  localStorage.setItem('accessToken', token);
};
export const deleteAccessToken = () => {
  localStorage.removeItem('accessToken');
};
export const getAccessToken = () => localStorage.getItem('accessToken');
