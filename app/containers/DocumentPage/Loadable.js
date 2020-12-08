/**
 *
 * Asynchronously loads the component for DocumentPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
