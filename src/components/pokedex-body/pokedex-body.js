import React from 'react'
import styled from 'styled-components'
import { Carousel } from 'react-bootstrap';
import on from './images/on.png'
import off from './images/off.png'

const Card = styled.div`
    background-color: #FF0000;
    box-shadow: 5px 10px 5px #888888;
    min-height: 500px;
    height: 650px;
    min-width: 800px;
    width: 800px;
    margin: 100px auto;
    display: flex;
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
`
// const ImageView = styled.div`
//     height: 150px;
//     width: 150px;
//     background-color: #B9F4FF;
//     border: solid 5px grey;
//     border-radius: 100%;
//     margin: 40px 0 0 85px;
// `
const Name = styled.p`
    color: #fff;
    font-family: Roboto;
    font-size: 36px;
    font-weight: bolder;
    margin: 0 0 5px 15px;
    align-self: center;
    text-transform: capitalize;
`
const DetailScreen = styled(Screen)`
    display: flex;
    flex-direction: column;
    height: 200px;
    width: 250px;
    margin: 0 0 0 15px;
`
const RightPane = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-content: center;
  `
const ControlButton = styled.div`
    position: relative;
    height: 30px;
    width: 20px;
    background-color: #FFEB00;
    border: solid 1px gray;
    box-shadow: 0 2px 4px #888888;
`
const RoundButton = styled.div`
    position: relative;
    height: 30px;
    width: 30px;
    border-radius: 100%;
    background-color: #FFEB00;
    border: solid 1px gray;
    box-shadow: 0 2px 4px #888888;

`
const Control = styled.div`
    margin: 20px 0 0 0;
    height: 150px;
    width: 315px;
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
    font-family: Roboto;
  `
const PreviewImg = styled.img`
    height: 100%;
    width: 100%;
  `

const DetailText = styled.p`
    text-transform: capitalize;
`
const powerButton = styled.img`
    cursor: pointer;
    position: relative;
    bottom: -50px;
    right: -65px;
    width: 150px;
    height: 120px;
    z-index: 2;
`
const PokedexBody = ({pokemons, onSelect, currentPokemon, isPokedexOn, power}) => (
    <Card>
        {console.log(isPokedexOn)}
        <Screen>
            {isPokedexOn && pokemons && pokemons.map((pokemon, i) => (
                <PokemonPreview 
                    key={pokemon.name} 
                    onClick={onSelect}
                    id={pokemon.name}
                >
                    <PreviewImg id={pokemon.name} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`}/>
                    <PreviewText id={pokemon.name} >{pokemon.name}</PreviewText>
                </PokemonPreview>
            ))}
        </Screen>
        <RightPane>
            {/* <ImageView /> */}
            {<Carousel className="image-view">
                    <img src={currentPokemon? currentPokemon.data.sprites.front_default : ""}/>
                    <img src={currentPokemon? currentPokemon.data.sprites.back_default : ""}/>
            </Carousel>}
            <Name>{currentPokemon? currentPokemon.data.name : "..." }</Name>
            <DetailScreen>
                <DetailText className="edit">{currentPokemon && `Type: ${currentPokemon.data.types.map((type) => ` ${type.type.name}`)}`}</DetailText>
                <DetailText className="edit">{currentPokemon && `Speed: ${currentPokemon.data.stats[0].base_stat}`}</DetailText>
                <DetailText className="edit">{currentPokemon && `Defense: ${currentPokemon.data.stats[3].base_stat}`}</DetailText>
                <DetailText className="edit">{currentPokemon && `Attack: ${currentPokemon.data.stats[4].base_stat}`}</DetailText>
                <DetailText className="edit">{currentPokemon && `HP: ${currentPokemon.data.stats[5].base_stat}`}</DetailText>
                <DetailText className="edit">{currentPokemon && `Sp.Defense: ${currentPokemon.data.stats[1].base_stat}`}</DetailText>
                <DetailText className="edit">{currentPokemon && `Sp.Attack: ${currentPokemon.data.stats[2].base_stat}`}</DetailText>
            </DetailScreen>
            {/* <img className="on-off-button" onClick={power} src={isPokedexOn? on : off}/> */}
            <powerButton onClick={power} src={isPokedexOn? on : off}/>
            {/* <Control>
                <ControlButton className="up-button"/>
                <ControlButton className="right-button"/>
                <ControlButton className="down-button"/>
                <ControlButton className="left-button"/>
                <RoundButton className="round-button-1" />
                <RoundButton className="round-button-2" />
            </Control> */}
        </RightPane>
    </Card>
)

export default PokedexBody;