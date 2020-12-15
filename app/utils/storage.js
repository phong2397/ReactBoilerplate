export const saveAccessToken = token => {
  localStorage.setItem('accessToken', token);
};
export const deleteAccessToken = () => {
  localStorage.removeItem('accessToken');
};
export const getAccessToken = () => localStorage.getItem('accessToken');

export const saveProfile = profile => {
  console.log(profile);
  localStorage.setItem('profile', JSON.stringify(profile));
};
export const removeProifle = () => {
  localStorage.removeItem('profile');
};
export const updateProfile = newProfile => {
  localStorage.setItem('profile', JSON.stringify(newProfile));
};
export const getProfile = () => {
  console.log('GET PROFILE ', localStorage.getItem('profile'));
  return JSON.parse(localStorage.getItem('profile'));
};
