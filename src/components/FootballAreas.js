import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosConfig from '../config';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

class FootballAreas extends React.Component {
  constructor() {
    super();
    this.state = {
      areas: [],
      totalData: 0,
      error: ''
    };
  }

  componentDidMount() {
    trackPromise(
      axios
        .get(`${axiosConfig.url('areas')}`, axiosConfig.config)
        .then((res) => {
          this.setState({ areas: res.data.areas, totalData: res.data.count });
        })
        .catch((error) => this.setState({ error }))
    );
  }

  render() {
    const { areas } = this.state;

    return (
      <Container className='mt-4'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Country Area</th>
              <th>Area</th>
            </tr>
          </thead>
          <tbody>
            {areas.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/areas/${data.id}`}>{data.name}</Link>
                </td>
                <td>{data.parentArea}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <LoadingProgress />
      </Container>
    );
  }
}

const LoadingProgress = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Spinner animation='grow' variant='primary' />
        <Spinner animation='grow' variant='secondary' />
        <Spinner animation='grow' variant='success' />
        <Spinner animation='grow' variant='danger' />
        <Spinner animation='grow' variant='warning' />
        <Spinner animation='grow' variant='info' />
      </div>
    )
  );
};

export default FootballAreas;
