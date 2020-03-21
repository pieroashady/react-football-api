import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListClub from './components/ListClub';
import FootballAreas from './components/FootballAreas';
import ClubProfile from './components/ClubProfile';
import Navigation from './components/Navbar';

class Index extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route exact path='/areas/:id' component={ListClub} />
            <Route exact path='/' component={FootballAreas} />
            <Route exact path='/club-profile/:id' component={ClubProfile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
