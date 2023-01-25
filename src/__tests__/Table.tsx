import {render, screen } from '@testing-library/react';
import React from 'react';
import Table from "../components/Table";
import {faker} from "@faker-js/faker";


const data = new Array(10000).fill(true).map(() => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email()
}))

test('should render virtualized table with list and scroll', async () => {
    render( <Table rows={data}/> );
    const items = screen.getAllByTestId('item')
    expect(items.length).toBeLessThan(1000)
    expect(items.length).toEqual(28)
    expect(screen.queryByText('Top')).not.toBeInTheDocument()
});