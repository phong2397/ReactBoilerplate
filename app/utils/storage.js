/**
 * Access token
 */
export const getAccessToken = () => localStorage.getItem('accessToken');
export const saveAccessToken = token => {
  localStorage.setItem('accessToken', token);
};
export const deleteAccessToken = () => localStorage.removeItem('accessToken');
/**
 * Company ID
 */
export const getCompanyId = () => localStorage.getItem('companyId');
export const setCompanyId = token => {
  localStorage.setItem('companyId', token);
};
export const deleteCompanyId = () => {
  localStorage.removeItem('companyId');
};
/**
 * Phone
 */
export const setPhone = phone => localStorage.setItem('phone', phone);
export const getPhone = () => localStorage.getItem('phone');
export const deletePhone = () => localStorage.removeItem('phone');
/**
 *  profile
 */
export const saveProfile = profile => {
  localStorage.setItem('profile', JSON.stringify(profile));
};
export const removeProifle = () => {
  localStorage.removeItem('profile');
};
export const updateProfile = newProfile => {
  localStorage.setItem('profile', JSON.stringify(newProfile));
};
export const getProfile = () => JSON.parse(localStorage.getItem('profile'));
//
export const savePhone = phone => {
  localStorage.setItem('phone', phone);
};
export const setOrderValue = value => localStorage.setItem('orderValue', value);
export const getOrderValue = () => localStorage.getItem('orderValue');
export const removeOrderValue = () => localStorage.removeItem('orderValue');
export const setOrderFeeValue = fee =>
  localStorage.setItem('orderFeeValue', fee);
export const getOrderFeeValue = () => localStorage.getItem('orderFeeValue');
export const removeOrderFeeValue = () =>
  localStorage.removeItem('orderFeeValue');
export const setProductConfig = productConfig =>
  localStorage.setItem('config', JSON.stringify(productConfig));
export const getProductConfig = () =>
  JSON.parse(localStorage.getItem('config'));
export const setCompanyInfo = company =>
  localStorage.setItem('companyInfo', JSON.stringify(company));
/**
 * Direct User Info Route
 */
export const setUserInfoRoute = routeName =>
  localStorage.setItem('userInfoRoute', routeName);
export const getUserInfoRoute = () => localStorage.getItem('userInfoRoute');
export const deleteUserInfoRoute = () =>
  localStorage.removeItem('userInfoRoute');

export const setCountBorrowInMonth = number =>
  localStorage.setItem('countBorrowInMonth', number);
export const getCountBorrowInMonth = () =>
  localStorage.getItem('countBorrowInMonth');
