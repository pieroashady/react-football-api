import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar sticky='top' bg='light' expand='lg'>
      <Navbar.Brand className='text-center mx-auto'>
        <Link to='/' className='text-dark text-center'>
          Football Areas
        </Link>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Navigation;
