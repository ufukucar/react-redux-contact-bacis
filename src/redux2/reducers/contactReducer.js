const initial_state = [
  {
    id: 1,
    name: "Ufuk Uçar",
    email: "ucar@gmail.com",
    number: 123456789,
  },
  {
    id: 2,
    name: "Ufuk Kaçar",
    email: "kacar@gmail.com",
    number: 987654321,
  },
];

const contactReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;

    case "EDIT_CONTACT":
      const updateState = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      state = updateState;
      return state;

    case "DELETE_CONTACT":
      const newState = state.filter(
        (contact) => contact.id !== action.payload && contact
      );
      state = newState;
      return state;

    default:
      return state;
  }
};

export default contactReducer;
