const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case "POWER_ON":
    return [...payload]

  default:
    return state
  }
}
