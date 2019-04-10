import { combineReducers } from 'redux';
import pokemons from './pokemons'
import utils from './utils'


export default combineReducers({
    pokemons,
    utils
})