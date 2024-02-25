<template>
  <div id="overlay">
    <h3 v-show="message">{{ message }}</h3>
    <div class="title">
      <h1>Tic</h1>
      <h1>Tac</h1>
      <h1>Vue</h1>
    </div>
    <h3>Player 1?</h3>
    <div class="actions">
      <button v-on:click="onClick('x')">
        <Cross />
      </button>
      <button v-on:click="onClick('o')">
        <CircleOutline />
      </button>
    </div>
    <div class="overall" v-show="shouldShowOverallResult">
      <span>Overall</span>
      <table class="result-table">
        <tbody>
          <tr>
            <td>Player 1</td>
            <td>{{ score(1) }}</td>
          </tr>
          <tr>
            <td>Player 2</td>
            <td>{{ score(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Cross from './Cross';
import CircleOutline from './Circle';

export default {
  components: {
    Cross,
    CircleOutline
  },
  data: function () {
    return {
      message: '',
      shouldShowOverallResult: false
    };
  },
  computed: {
    winner() {
      return this.$store.state.winner
        ? this.$store.state.winner == this.$store.state.player
          ? 1
          : 2
        : null;
    },
    overall() {
      return this.$store.state.overall;
    }
  },
  methods: {
    onClick(player) {
      this.$store.commit('setPlayer', { player });
      this.$store.commit('startGame');
    },
    score(player) {
      return this.$store.state.overall[player - 1];
    }
  },
  watch: {
    winner: function (winningPlayer) {
      if (!winningPlayer) {
        this.message = 'Game drawn!';
      } else {
        this.message = 'Player ' + winningPlayer + ' won!';
      }
    },
    overall: function (result) {
      this.shouldShowOverallResult = result.some(Boolean);
    }
  }
};
</script>

<style scoped>
#overlay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.9);
}

.title {
  display: inline-block;
}

.title h1 {
  display: inline;
  margin-right: 16px;
}

.title :first-child {
  color: #42b883;
}

.title :nth-child(2) {
  color: #35495e;
}

.title :nth-child(3) {
  color: #42b883;
  margin: 0;
}

.actions {
  display: flex;
}

.actions button {
  width: 120px;
  padding: 16px;
  outline: none;
  border: none;
  cursor: pointer;
}

.actions :first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.actions :last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.overall {
  margin-top: 16px;
  text-align: center;
}

.result-table {
  margin-top: 16px;
  border-collapse: collapse;
}

.result-table td {
  padding: 8px;
  border: 2px solid #2c3e50;
}
</style>
