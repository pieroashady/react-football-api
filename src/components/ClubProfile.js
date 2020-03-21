import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Row, Col, Spinner, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosConfig from '../config';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';

class ClubProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      squad: [],
      playerDetails: {},
      modalShow: false
    };
    this.modalHandler = this.modalHandler.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    trackPromise(
      axios.get(axiosConfig.url('teams/') + id, axiosConfig.config).then((res) => {
        this.setState({ profile: res.data, squad: res.data.squad });
      })
    );
  }

  modalHandler(e) {
    this.setState({ modalShow: true });
    console.log(e);
  }

  handleModalId(playerId) {
    this.setState({ modalShow: true });
    axios.get(axiosConfig.url('players/') + playerId, axiosConfig.config).then((res) => {
      this.setState({ playerDetails: res.data });
    });
  }

  render() {
    const { profile, squad, modalShow, playerDetails } = this.state;
    return (
      <Container className='mt-4'>
        <LoadingProgress />
        <Row>
          <Col className='justify-content-center' sm={4}>
            <Profile club={profile} />
          </Col>
          <Col sm={8} className='overflow-scroll' style={{ right: '0' }}>
            <Table bordered>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Player Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {squad.map((data) => (
                  <tr key={data.id}>
                    <td>{data.position}</td>
                    <td>{data.name}</td>
                    <td>
                      <Button variant='primary' id={data.id} onClick={this.handleModalId.bind(this, data.id)}>
                        Show Detail
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <ShowModal show={modalShow} player={playerDetails} onHide={() => this.setState({ modalShow: false })} />
      </Container>
    );
  }
}

const Profile = (props) => {
  return (
    <div className='text-center'>
      <img src={props.club.crestUrl} alt={props.club.name} loading='lazy' width={70} height={70} />
      <h3>Team Name</h3>
      <p className='mb-2'>{props.club.name}</p>
      <h3>Founded</h3>
      <p className='mb-2'>{props.club.founded}</p>
      <h3>Venue</h3>
      <p className='mb-2'>{props.club.venue}</p>
      <h3>Address</h3>
      <p className='mb-2'>{props.club.address}</p>
      <h3>Email</h3>
      <p className='mb-2'>{props.club.email}</p>
      <h3>Phone</h3>
      <p className='mb-2'>{props.club.phone}</p>
      <h3>Website</h3>
      <p className='mb-2'>
        <a href={props.club.website}>{props.club.website}</a>
      </p>
    </div>
  );
};

const ShowModal = (props) => {
  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Player Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='text-center'>
          <h3>Full Name</h3>
          <p className='mb-2'>{props.player.name}</p>
          <h3>Nationality</h3>
          <p className='mb-2'>{props.player.nationality}</p>
          <h3>Position</h3>
          <p className='mb-2'>{props.player.position}</p>
          <h3>Date of birth</h3>
          <p className='mb-2'>{props.player.dateOfBirth}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const LoadingProgress = () => {
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

export default ClubProfile;
