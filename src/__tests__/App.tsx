import {fireEvent, render, screen} from '@testing-library/react';
import App from '../App';
import React from 'react';
import {act} from "react-dom/test-utils";

test('should render the correct snapshot of the landing page with virtualized list', () => {
 render( <App /> );
  expect(screen.getByText('Virtualized list: 100,000')).toBeInTheDocument();
  act(() => {
   expect(screen.getAllByTestId('item').length).toBeLessThan(1000)
   expect(screen.getAllByTestId('item').length).toEqual(28)
 });

  const addNewBtn = screen.getByText('Add new item')
 fireEvent.click(addNewBtn)
 expect(screen.getByText('Virtualized list: 100,001')).toBeInTheDocument();
});
