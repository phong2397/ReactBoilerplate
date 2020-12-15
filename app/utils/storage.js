export const saveAccessToken = token => {
  localStorage.setItem('accessToken', token);
};
export const deleteAccessToken = () => {
  localStorage.removeItem('accessToken');
};
export const getAccessToken = () => localStorage.getItem('accessToken');

export const saveProfile = profile => {
  console.log('SAVE PROFILE ?', profile);
  localStorage.setItem('profile', JSON.stringify(profile));
};
export const removeProifle = () => {
  localStorage.removeItem('profile');
};
export const updateProfile = newProfile => {
  localStorage.setItem('profile', JSON.stringify(newProfile));
};
export const getProfile = () => JSON.parse(localStorage.getItem('profile'));
export const savePhone = phone => {
  localStorage.setItem('phone', phone);
};
export const deletePhone = () => {
  localStorage.removeItem('phone');
};
export const getPhone = () => localStorage.getItem('phone');
