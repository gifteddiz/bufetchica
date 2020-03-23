export const state = () => ({
  places: [
    { id: 1, addr: "ул Щепкина 35" },
    { id: 2, addr: "Орловский пер 7" },
    { id: 3, addr: "ул Трифоновская 26" },
    { id: 4, addr: "Спиридоньевский пер. 5/1" },
    { id: 5, addr: "ул Правды 15" },
    { id: 6, addr: "Рублево-успенское ш. 187" }
  ]
});

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  loggedInUser(state) {
    return state.auth.user;
  }
};
