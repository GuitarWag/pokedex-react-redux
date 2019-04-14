import React from 'react'
import styled from 'styled-components'
import { Carousel, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import on from './images/on.png'
import off from './images/off.png'
import Axios from 'axios'
const API_LINK = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=694"
 
const Card = styled(Container)`
    background-color: #FF0000;
    box-shadow: 5px 10px 5px #888888;
    min-height: 500px;
    height: 650px;
    min-width: 800px;
    width: 800px;
    margin: 100px auto;
    display: flex;
    @media only screen and (max-width: 600px) {
        flex-direction: column;
        width: 100%;
        min-width: 100%;
        height: auto;
        margin: 0 auto;
        overflow: auto;
    }
`
const Screen = styled.div`
    height: 560px;
    width: 400px;
    background-color: #B9F4FF;
    border: solid 5px grey;
    margin: 40px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media only screen and (max-width: 600px) {
        justify-content: space-around;
        margin: 60px auto;
        width: 95%;
        min-width: 270px;
        max-width: 95%;
        height: 400px;
    }
`

const Name = styled.p`
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 36px;
    font-weight: bolder;
    margin: 0 0 5px 15px;
    align-self: center;
    text-transform: capitalize;
    @media only screen and (max-width: 600px) {
        margin: 0 auto;
        width: 95%;
        max-width: ${window.innerWidth}
    }
`
const DetailScreen = styled(Screen)`
    display: flex;
    flex-direction: column;
    height: 200px;
    width: 250px;
    margin: 0 0 0 15px;
    @media only screen and (max-width: 600px) {
        margin: 10px auto;
        width: 90%;
        height: 300px;
        margin-bottom: 40px;
    }
`
const RightPane = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-content: center;
  `
const PokemonPreview = styled.div`
    cursor: pointer;
    height: 110px;
    width: 110px;
    border: solid 1px #B9F4FF;
    margin: 5px;
    display: flex;
    flex-direction: column;
    text-align: center;
    text-transform: capitalize;
    box-shadow: 3px 3px 5px #888888;
    :hover{
        transition-delay: 50ms;
        border: solid 1px rgba(3, 3, 255, 0.5);;
      }
`
const PreviewText = styled.p`
    margin: -5px 0 5px 0;
    justify-self: flex-end;
    font-size: 14px;
    font-weight: bolder;
    font-family: 'Roboto', sans-serif;
  `
const PreviewImg = styled.img`
    height: 100%;
    width: 100%;
  `

const DetailText = styled.p`
    align-self: flex-start;
    margin: 0 0 0 5px;
    text-transform: capitalize;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bolder;
    font-family: 'Roboto', sans-serif;
`

const PokedexBody = ({pokemons, onSelect, currentPokemon, isPokedexOn, power}) => (
    <Card>
        <Screen>
            {isPokedexOn && pokemons && pokemons.map((pokemon, i) => (
                <PokemonPreview 
                    key={pokemon.name} 
                    onClick={(e)=> onSelect(e)}
                    id={pokemon.name}
                >
                    <PreviewImg id={pokemon.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`}/>
                    <PreviewText id={pokemon.name} >{pokemon.name}</PreviewText>
                </PokemonPreview>
            ))}
        </Screen>
        <RightPane>
            {isPokedexOn? <Carousel className="image-view">
                    <img src={currentPokemon? currentPokemon.data.sprites.front_default : ""}/>
                    <img src={currentPokemon? currentPokemon.data.sprites.back_default : ""}/>
            </Carousel> :
            <Carousel className="image-view" />}
            <Name>{currentPokemon && isPokedexOn? currentPokemon.data.name : "..." }</Name>
            <DetailScreen>
                <DetailText className="edit">{isPokedexOn && currentPokemon && `Type: ${currentPokemon.data.types.map((type) => ` ${type.type.name}`)}`}</DetailText>
                <DetailText className="edit">{isPokedexOn && currentPokemon && `Speed: ${currentPokemon.data.stats[0].base_stat}`}</DetailText>
                <DetailText className="edit">{isPokedexOn && currentPokemon && `Defense: ${currentPokemon.data.stats[3].base_stat}`}</DetailText>
                <DetailText className="edit">{isPokedexOn && currentPokemon && `Attack: ${currentPokemon.data.stats[4].base_stat}`}</DetailText>
                <DetailText className="edit">{isPokedexOn && currentPokemon && `HP: ${currentPokemon.data.stats[5].base_stat}`}</DetailText>
                <DetailText className="edit">{isPokedexOn && currentPokemon && `Sp.Defense: ${currentPokemon.data.stats[1].base_stat}`}</DetailText>
                <DetailText className="edit">{isPokedexOn && currentPokemon && `Sp.Attack: ${currentPokemon.data.stats[2].base_stat}`}</DetailText>
            </DetailScreen>
            <img className="on-off-button" onClick={() => power(isPokedexOn)} src={isPokedexOn? on : off}/>
        </RightPane>
    </Card>
)
const mapStateToProps = (state) => ({
    pokemons: state.pokemons,
    isPokedexOn: state.utils.isPokedexOn,
    currentPokemon: state.currentPokemon
})
const mapDispatchToProps = (dispatch) => ({
    onSelect: async (e) => {
        const selectedPokemon = e.target.id
        const currentPokemon = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
        dispatch({
            type: "SELECT_POKEMON",
            payload: currentPokemon
        })
    },
    power: async (isPokedexOn) => {
        if (!isPokedexOn) {
            const res = await Axios.get(API_LINK)
            const pokemons = res.data.results
            dispatch({
                type: "POWER_ON",
                payload: [...pokemons]
            })
            dispatch({
                type: "POWER_BUTTON",
                payload: !isPokedexOn
            })
        }
        dispatch({
            type: "POWER_BUTTON",
            payload: !isPokedexOn
        })
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(PokedexBody);