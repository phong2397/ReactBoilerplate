/*
 * CustomerCard Messages
 *
 * This contains all the text for the CustomerCard component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.CustomerCard';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the CustomerCard component!',
  },
});
