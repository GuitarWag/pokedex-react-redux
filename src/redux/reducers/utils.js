const initialState = {
    isPokedexOn: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case "POWER_BUTTON":
    return {isPokedexOn: payload }

  default:
    return state
  }
}
