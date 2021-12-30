import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AddCountry = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch('https://protected-caverns-47687.herokuapp.com/countries')
            .then(res => res.json())
            .then(data => {
                const filterData = data.filter(d => d.status === 'Approved');
                setCountries(filterData);
            });
    }, [countries])

    // form 
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        data.status = 'Approved';
        console.log(data)
        // setCountry(data)
        axios.post('https://protected-caverns-47687.herokuapp.com/countries', data)
            .then(res => {
                if (res.data.insertedId) {
                    alert("sussesfully done");
                    reset();
                }
            })
    }

    return (
        <>
            <div>
                <Container className='d-flex align-items-center'>
                    <div className='w-50 mx-auto text-start'>
                        <Link to="/home">
                            <button className='mt-5 btn btn-primary'>Back</button>
                        </Link>
                        <h1>Add country</h1>
                        <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
                            <input className='d-block w-100 mb-3' placeholder="Add Country" type="text" {...register("country_name", { required: true })} />
                            <input className="btn btn-primary d-block w-100" type="submit" value="ADD COUNTRY" />
                        </form>
                    </div>
                </Container>
                <Container>
                    <div className='w-50 mx-auto'>
                        <Table striped bordered hover size='sm'>
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
        </>
    );
};

export default AddCountry;