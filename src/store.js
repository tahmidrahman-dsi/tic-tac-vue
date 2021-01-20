import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    player: 'x',
    gameInProgress: false,
    winner: null
  },
  mutations: {
    setPlayer(state, payload) {
      state.player = payload.player;
      state.gameInProgress = true;
    },
    startGame(state) {
      state.gameInProgress = true;
    },
    stopGame(state) {
      state.gameInProgress = false;
    },
    setWinner(state, payload) {
      state.winner = payload.winner;
    }
  }
});

export default store;
