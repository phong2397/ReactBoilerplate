/**
 *
 * Asynchronously loads the component for CompletedOrder
 *
 */
import React from 'react';
import loadable from 'utils/loadable';
import BackDropLoading from 'components/BackDropLoading';

export default loadable(() => import('./index'), {
  fallback: <BackDropLoading />,
});
