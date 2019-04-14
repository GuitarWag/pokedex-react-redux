import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
import PokedexBody from './components/pokedex-body/pokedex-body';

class App extends Component {
  render() {
    return (
      <Container>
        <PokedexBody/>
      </Container>
    );
  }
}

export default App;
