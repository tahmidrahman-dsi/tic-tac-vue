import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    player: 'x',
    isGameInProgress: false,
    winner: undefined
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
    }
  }
});

export default store;
