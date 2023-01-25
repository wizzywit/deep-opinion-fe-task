import React, {useState} from 'react';
import './App.css';
import { faker } from '@faker-js/faker';
import Table from "./components/Table";

function App() {
    const [people, setPeople] = useState(new Array(100000).fill(true).map(() => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email()
    })))

    const addItem = () => {
        setPeople((pre) => ([{
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email()
        }, ...pre]))
    }

  return (
    <div className="container">
      <div className="header">
        <h1>Virtualized list: {people.length}</h1>
        <button className="btn" onClick={addItem}>Add new item</button>
      </div>
        <div className="table-wrapper">
            <Table  rows={people}/>
        </div>
    </div>
  );
}

export default App;
