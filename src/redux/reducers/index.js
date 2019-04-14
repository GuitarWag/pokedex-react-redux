import { combineReducers } from 'redux';
import pokemons from './pokemons'
import utils from './utils'
import currentPokemon from './current-pokemon';


export default combineReducers({
    pokemons,
    utils,
    currentPokemon
})