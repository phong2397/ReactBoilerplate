/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const ON_LOAD_APP = 'boilerplate/App/ON_LOAD_APP';
export const ON_LOAD_APP_SUCCESS = 'boilerplate/App/ON_LOAD_APP_ERROR';
export const ON_LOAD_APP_ERROR = 'boilerplate/App/ON_LOAD_APP_ERROR';
export const AUTHENTICATED = 'boilerplate/App/AUTHENTICATED';
export const UNAUTHENTICATED = 'boilerplate/App/UNAUTHENTICATED';
export const REQUEST_LOGOUT = 'boilerplate/App/REQUEST_LOGOUT';
