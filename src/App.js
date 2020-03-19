import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';
import baseUrl from './config';
import { Link } from 'react-router-dom';

class Football extends React.Component {
  constructor() {
    super();
    this.state = {
      football: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`${baseUrl.url('teams?')}areas=${id}`, baseUrl.config).then((res) => {
      this.setState({ football: res.data.teams });
      localStorage.setItem('football', res.data.teams);
    });
  }

  render() {
    const { football } = this.state;

    return (
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Club Name</th>
              <th>Crest</th>
            </tr>
          </thead>
          <tbody>
            {football.map((x) => (
              <tr key={x.id}>
                <td>
                  <Link to={`/club-profile/${x.id}`}>{x.id}</Link>
                </td>
                <td>{x.name}</td>
                <td>
                  <img loading={'eager'} width={40} height={40} src={x.crestUrl} alt={x.name} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default Football;
