import React, { Component, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container, Spinner, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosConfig from '../config';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

class PlayerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {}
    };
  }

  componentDidMount() {
    const playerId = this.props.match.params.id;
    trackPromise(
      axios
        .get(axiosConfig.url('players/') + playerId, axiosConfig.config)
        .then((res) => {
          this.setState({ details: res.data });
        })
        .catch((error) => this.setState({ error }))
    );
  }

  render() {
    const { details } = this.state;
    return <Details player={details} />;
  }
}

const Details = (props) => {
  const [ show, setShow ] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Player Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='text-center'>
          <h3>Full Name</h3>
          <p className='mb-2'>{props.player.name}</p>
          <h3>Nationality</h3>
          <p className='mb-2'>{props.player.naionality}</p>
          <h3>Position</h3>
          <p className='mb-2'>{props.player.position}</p>
          <h3>Date of birth</h3>
          <p className='mb-2'>{props.player.dateOfBirth}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlayerDetails;
