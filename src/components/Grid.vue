<template>
  <div class="grid">
    <h4>
      Current turn: Player {{ player === turn ? '1' : '2' }} to play
      {{ turn.toUpperCase() }}
    </h4>
    <table>
      <tbody>
        <tr v-for="row in dimension" v-bind:key="row">
          <td
            v-for="column in dimension"
            v-bind:key="column"
            :set="(position = (row - 1) * dimension + column - 1)"
            v-bind:highlighted="highlightedCells.includes(position)"
            v-on:click="onClickCell(row, column)"
          >
            <Cross id="cross" v-show="grid[position] === 'x'" />
            <CircleOutline id="circle" v-show="grid[position] === 'o'" />
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
import { checkGameState } from '../game';

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

export default {
  data: function () {
    return {
      turn: 'x',
      grid: getInitialState.apply(this),
      highlightedCells: []
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
    isGameInProgress: function (newValue, oldValue) {
      var isGameRestarted = newValue && newValue != oldValue;
      if (isGameRestarted) {
        this.highlightedCells = [];
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
        var gameState = checkGameState(this.grid, this.turn, this.dimension);
        if (gameState.over) {
          this.highlightedCells = gameState.winningCondition || [];
          this.setWinner({ winner: gameState.winner });
          this.stopGame();
          this.updateOverall(
            this.$store.state.player == gameState.winner ? 1 : 2
          );
        }
        changeTurn.apply(this);
      }
    },
    ...mapMutations(['stopGame', 'setWinner', 'updateOverall'])
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

td[highlighted] {
  border: 6px solid #42b883;
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
