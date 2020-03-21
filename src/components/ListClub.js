import React from 'react';
import axios from 'axios';
import _ from 'lodash/lang';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Spinner } from 'react-bootstrap';
import baseUrl from '../config';
import { Link } from 'react-router-dom';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';

class ListClub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      football: [],
      isLoading: false
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    trackPromise(
      axios
        .get(`${baseUrl.url('teams?')}areas=${id}`, baseUrl.config)
        .then((res) => {
          this.setState({ football: res.data.teams });
        })
        .catch((err) => console.error(err))
    );
  }

  render() {
    const { football } = this.state;
    _.isEmpty(football) ? console.log('yes') : console.log('no');

    return (
      <Container className='mt-4'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Club Name</th>
              <th>Crest</th>
            </tr>
          </thead>
          <tbody>
            {_.isEmpty(football) ? (
              <tr>
                <td colSpan='3' className='text-center'>
                  No Data
                </td>
              </tr>
            ) : (
              <ClubData football={football} />
            )}
          </tbody>
        </Table>
        <LoadingProgress2 />
      </Container>
    );
  }
}

const LoadingProgress2 = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div
        style={{
          width: '100%',
          height: '50%',
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

const ClubData = (props) => {
  return props.football.map((x, y) => (
    <tr key={x.id}>
      <td>{y + 1}</td>
      <td>
        <Link to={`/club-profile/${x.id}`}>{x.name}</Link>
      </td>
      <td>
        <img loading={'eager'} width={40} height={40} src={x.crestUrl} alt={x.name} />
      </td>
    </tr>
  ));
};

export default ListClub;
