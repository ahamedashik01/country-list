import React, { useState } from 'react';

import { useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    const [countries, setCountries] = useState([]);


    useEffect(() => {
        fetch('https://protected-caverns-47687.herokuapp.com/countries')
            .then(res => res.json())
            .then(data => {
                const filterData = data.filter(d => d.status === 'Approved');
                setCountries(filterData);
            });
    }, [countries])


    return (
        <Container>
            <div>
                <div className='mt-5'>
                    <div className='w-50 mx-auto'>
                        <div>
                            <Row>
                                <Col xs={12} md={6}>
                                    <div className='text-start'>
                                        <h1>Countries List</h1>
                                    </div>
                                    <div className='text-start py-3'>
                                        <Link to="/add-country">
                                            <button className="btn btn-primary">
                                                Add Country
                                            </button>
                                        </Link>
                                        <Link to="/manage">
                                            <button className="ms-3 btn btn-primary">
                                                Mangae
                                            </button>
                                        </Link>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        {/* {
                                            user.email ?
                                                <button onClick={logOut} className="px-2 btn btn-danger text-white"> Logout</button>
                                                :
                                                <Link to="/login"><button className="px-3 text-white btn btn-info">Log In</button></Link>
                                        } */}
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div>
                            <Table striped bordered hover size='sm'>
                                <tbody>
                                    {
                                        countries.map(country => <tr
                                            key={country._id}
                                        >
                                            <td>
                                                {country.country_name}
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Home;