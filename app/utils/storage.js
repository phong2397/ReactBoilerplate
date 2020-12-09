export const saveAccessToken = token => {
  localStorage.setItem('accessToken', token);
};
export const deleteAccessToken = () => {
  localStorage.removeItem('accessToken');
};
export const getAccessToken = () => {
  console.log('Check ?');
  return localStorage.getItem('accessToken');
};
