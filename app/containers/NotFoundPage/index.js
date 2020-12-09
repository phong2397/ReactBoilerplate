/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { Redirect } from 'react-router-dom';

export default function NotFound() {
  return <Redirect to="/" />;
}
