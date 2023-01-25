import {fireEvent, render, screen} from '@testing-library/react';
import App from '../App';
import React from 'react';

test('should render the correct snapshot of the landing page with virtualized list', () => {
 render( <App /> );
  expect(screen.getByText('Virtualized list: 10000')).toBeInTheDocument();
  expect(screen.getAllByTestId('item').length).toBeLessThan(1000)
  expect(screen.getAllByTestId('item').length).toEqual(28)
  const addNewBtn = screen.getByText('Add new item')
 fireEvent.click(addNewBtn)
 expect(screen.getByText('Virtualized list: 10001')).toBeInTheDocument();
});
