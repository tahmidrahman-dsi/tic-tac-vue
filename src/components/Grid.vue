<template>
  <div class="grid">
    <h4 v-show="isGameInProgress">Current turn: {{ turn.toUpperCase() }}</h4>
    <table>
      <tbody>
        <tr v-for="row in dimension" v-bind:key="row">
          <td
            v-for="column in dimension"
            v-bind:key="column"
            v-on:click="onClickCell(row, column)"
          >
            <Cross
              id="cross"
              v-show="grid[(row - 1) * dimension + column - 1] === 'x'"
            />
            <CircleOutline
              id="circle"
              v-show="grid[(row - 1) * dimension + column - 1] === 'o'"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import CircleOutline from './Circle';
import Cross from './Cross';
import { mapMutations } from 'vuex';

function getInitialState() {
  var dimension = this.$props.dimension;
  var grid = Array(dimension * dimension);
  return grid.fill(null);
}

function changeTurn() {
  this.turn = this.turn === 'x' ? 'o' : 'x';
}

function updateCell(position) {
  this.$set(this.grid, position, this.turn);
}

function getWinningCondition() {
  var winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winConditions.find(
    (cell) =>
      this.grid[cell[0]] !== null &&
      this.grid[cell[0]] === this.grid[cell[1]] &&
      this.grid[cell[1]] === this.grid[cell[2]]
  );
}

function checkGameState() {
  var winningCondition = getWinningCondition.apply(this);
  if (winningCondition) {
    return { over: true, condition: winningCondition, winner: this.turn };
  } else if (this.grid.every(Boolean)) {
    return { over: true, winner: null };
  } else return { over: false };
}

export default {
  data: function() {
    return {
      turn: 'x',
      grid: getInitialState.apply(this)
    };
  },
  props: {
    dimension: {
      type: Number,
      default: 3
    }
  },
  components: {
    CircleOutline,
    Cross
  },
  computed: {
    player() {
      return this.$store.state.player;
    },
    isGameInProgress() {
      return this.$store.state.isGameInProgress;
    }
  },
  watch: {
    isGameInProgress: function(newValue, oldValue) {
      var isGameRestarted = newValue && newValue != oldValue;
      if (isGameRestarted) {
        this.grid = getInitialState.apply(this);
        this.turn = 'x';
      }
    }
  },
  methods: {
    onClickCell(row, column) {
      var position = (row - 1) * this.dimension + column - 1;
      var isEmpty = this.grid[position] === null;

      if (isEmpty) {
        updateCell.apply(this, [position]);
        var gameState = checkGameState.apply(this);
        if (gameState.over) {
          this.setWinner({ winner: gameState.winner });
          this.stopGame();
        }
      }

      changeTurn.apply(this);
    },
    ...mapMutations(['stopGame', 'setWinner'])
  }
};
</script>

<style scoped>
.grid {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 16px);
}

td {
  border: 6px solid lightgrey;
  position: relative;
}

td > * {
  position: absolute;
  top: 0;
}

td,
svg {
  height: calc(100vh / 5);
  width: calc(100vh / 5);
}

#circle {
  height: calc(100vh / 5 * 0.8);
  width: calc(100vh / 5 * 0.8);
  padding: calc(100vh / 5 * 0.09);
}

@media only screen and (max-width: 600px) {
  td,
  svg {
    height: calc(100vw / 5);
    width: calc(100vw / 5);
  }

  #circle {
    height: calc(100vw / 5 * 0.8);
    width: calc(100vw / 5 * 0.8);
    padding: calc(100vw / 5 * 0.1);
  }
}
</style>
