import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [userCountries, setUserCountries] = useState([]);
    const { user, logOut } = useAuth();

    useEffect(() => {
        fetch('https://infinite-peak-02310.herokuapp.com/countries')
            .then(res => res.json())
            .then(data => {
                const AprrovedData = data.filter(d => d.status === 'Approved');
                const UserFilterData = data.filter(d => d.email === user.email);
                const underReviewData = UserFilterData.filter(d => d.status !== 'Approved');
                setCountries(AprrovedData);
                setUserCountries(underReviewData);
            });
    }, [])


    return (
        <Container>
            <div>
                <div className='mt-5 border border-1'>
                    <div className='w-50 p-5 mx-auto'>
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
                                        {user.email === "hitachiuzumakhi@gmail.com" ? <Link to="/manage">
                                            <button className="ms-3 btn btn-primary">
                                                Mangae
                                            </button>
                                        </Link>
                                            :
                                            ''}
                                    </div>
                                </Col>
                                <Col className='text-end' xs={12} md={6}>
                                    {
                                        user.email === 'hitachiuzumakhi@gmail.com' ?
                                            <h5>Welcome Admin</h5>
                                            :
                                            ''
                                    }
                                    {
                                        user.displayName && <h4>{user.displayName}</h4>
                                    }
                                    {
                                        user.email ?
                                            <button onClick={logOut} className="px-2 btn btn-danger text-white"> Logout</button>
                                            :
                                            <Link to="/login"><button className="px-3 text-white btn btn-primary">Log In</button></Link>
                                    }

                                </Col>
                            </Row>
                        </div>

                        <div >
                            {user.email ? <Table striped bordered hover size='sm'>
                                <tbody>
                                    {
                                        userCountries.map(country => <tr
                                            key={country._id}
                                        >
                                            <td>
                                                {country.country_name} ({country.status})
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </Table>
                                :
                                ''
                            }
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