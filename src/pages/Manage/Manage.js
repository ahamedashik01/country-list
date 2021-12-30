import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Manage = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch('https://protected-caverns-47687.herokuapp.com/countries')
            .then(res => res.json())
            .then(data => {
                setCountries(data);
            });
    }, [countries])

    return (
        <div>
            <Container>
                <div className='w-50 mx-auto text-start'>
                    <Link to="/home">
                        <button className='mt-5 btn btn-primary'>Back</button>
                    </Link>
                    <h1>Manage country</h1>
                </div>
            </Container>
            <Container>
                <div className='w-50 mx-auto'>
                    <Table striped bordered hover size='sm'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>status</th>
                                <th colSpan={2}>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                countries.map(country => <tr
                                    key={country._id}
                                >
                                    <td>
                                        {country.country_name}
                                    </td>
                                    <td>
                                        {country.status}
                                    </td>
                                    <td>
                                        <button className="btn btn-success">
                                            Approve
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger">
                                            Delete
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>
        </div>
    );
};

export default Manage;