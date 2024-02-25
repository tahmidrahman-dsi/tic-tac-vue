import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    player: 'x',
    isGameInProgress: false,
    winner: undefined,
    overall: [0, 0]
  },
  mutations: {
    setPlayer(state, payload) {
      state.player = payload.player;
    },
    startGame(state) {
      state.isGameInProgress = true;
    },
    stopGame(state) {
      state.isGameInProgress = false;
    },
    setWinner(state, payload) {
      state.winner = payload.winner;
    },
    updateOverall(state, player) {
      Vue.set(state.overall, player - 1, state.overall[player - 1] + 1);
    }
  }
});

export default store;
