import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
import PokedexBody from './components/pokedex-body/pokedex-body';
import Axios from 'axios'

const API_LINK = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=694"

class App extends Component {
  constructor() {
    super();
    this.state = { 
      pokemons: null,
      currentPokemon: null,
      isPokedexOn: false,
      }; 
  
  }
  power(){
    this.setState({
      isPokedexOn: !this.state.isPokedexOn,
      currentPokemon: null
    })
  }
  async onSelect(e){
    const selectedPokemon = e.target.id
    const currentPokemon = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
    
    this.setState({
      currentPokemon
    })
  }

  async componentWillMount(){
    const res = await Axios.get(API_LINK)
    const pokemons = res.data.results
    this.setState({
      pokemons
    })
  }
  render() {
    return (
      <Container>
        <PokedexBody 
          pokemons={this.state.pokemons}
          currentPokemon={this.state.currentPokemon}
          onSelect={(e) => this.onSelect(e)}
          isPokedexOn={this.state.isPokedexOn}
          power={this.power.bind(this)}
        />
      </Container>
    );
  }
}

export default App;
