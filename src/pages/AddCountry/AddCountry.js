import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AddCountry = () => {
    const [countries, setCountries] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch('https://infinite-peak-02310.herokuapp.com/countries')
            .then(res => res.json())
            .then(data => {
                const UserFilterData = data.filter(d => d.email === user.email);
                setCountries(UserFilterData);
            });
    }, [])

    // form 
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        data.status = 'Under Review';
        data.displayName = user.displayName;
        data.email = user.email;
        axios.post('https://infinite-peak-02310.herokuapp.com/countries', data)
            .then(res => {
                if (res.data.insertedId) {
                    alert("sussesfully done");
                    reset();
                    window.location.reload()
                }
            })
    }

    return (
        <>
            <div>
                <div className='w-75 mx-auto border border-box mt-5'>
                    <Container className='d-flex align-items-center'>
                        <div className='w-50 mx-auto text-start'>
                            <Link to="/home">
                                <button className='my-4 btn btn-primary'><i className="me-2 fas fa-chevron-left"></i>Back</button>
                            </Link>
                            <h2>Add country</h2>
                            <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
                                <input className='d-block w-100 mb-3' placeholder="Type your country here" type="text" {...register("country_name", { required: true })} />
                                <input className="btn btn-primary d-block w-100" type="submit" value="ADD COUNTRY" />
                            </form>
                        </div>
                    </Container>
                    <Container>
                        <div className='w-50 mx-auto'>
                            <Table className='mb-5' striped bordered hover size='sm'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>status</th>
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
                                        </tr>)
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default AddCountry;