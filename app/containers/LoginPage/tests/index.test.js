/**
 *
 * Tests for LoginPage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import configureStore from '../../../configureStore';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { LoginPage } from '../index';

describe('<LoginPage />', () => {
  let store;
  beforeAll(() => {
    store = configureStore();
  });
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    // const loginStep = 0;
    // const errorServer = null;
    // const loading = false;
    // const companyList = [];

    render(
      <Provider store={store}>
        <LoginPage
          dispatch={dispatch}
          // loginStep={loginStep}
          // errorServer={errorServer}
          // loading={loading}
          // companyList={companyList}
        />
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  // it('Expect to have additional unit tests specified', () => {
  //   expect(true).toEqual(false);
  // });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<LoginPage />);
    expect(firstChild).toMatchSnapshot();
  });
});
