import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Manage = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState({});

    useEffect(() => {
        fetch('https://infinite-peak-02310.herokuapp.com/countries')
            .then(res => res.json())
            .then(data => {
                setCountries(data);
            });
    }, []);

    // update the status 
    const handleUpdate = id => {
        const url = `https://infinite-peak-02310.herokuapp.com/countries/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setCountry(data));
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(country)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount === 1) {
                    alert('Approved successfully');
                    window.location.reload();
                }
                if (data.modifiedCount === 0) {
                    alert('Already Approved');
                }
            });
    }

    // delete action 
    const handleDelete = id => {
        const procced = window.confirm('Are you sure, you want to delete?');
        if (procced) {
            const url = `https://infinite-peak-02310.herokuapp.com/countries/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        alert('Entry Deleted')
                        window.location.reload();
                    }
                });
        }
    }

    return (
        <div>
            <div className='w-75 mx-auto border border-1 mt-5' >
                <Container>
                    <div className='w-50 mx-auto text-start'>
                        <Link to="/home">
                            <button className='my-4 btn btn-primary'><i className="me-2 fas fa-chevron-left"></i>Back</button>
                        </Link>
                        <h1 className='py-3'>Manage country</h1>
                    </div>
                </Container>
                <Container>
                    <div className='w-50 mx-auto'>
                        <Table className='mb-5' striped bordered hover size='sm'>
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
                                            <button onClick={() => handleUpdate(country._id)} className="btn btn-success">
                                                Approve
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(country._id)} className="btn btn-danger">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Manage;