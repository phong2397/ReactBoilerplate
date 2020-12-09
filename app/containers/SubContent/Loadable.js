/**
 *
 * Asynchronously loads the component for SubContent
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
