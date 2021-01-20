<template>
  <div id="overlay">
    <div class="title">
      <h1>Tic</h1>
      <h1>Tac</h1>
      <h1>Vue</h1>
    </div>
    <h3>Play?</h3>
    <div class="actions">
      <button v-on:click="setPlayer({ player: 'x' })">
        <Cross />
      </button>
      <button v-on:click="setPlayer({ player: 'o' })">
        <CircleOutline />
      </button>
    </div>
  </div>
</template>
<script>
import Cross from './Cross';
import CircleOutline from './Circle';
import { mapMutations } from 'vuex';

export default {
  components: {
    Cross,
    CircleOutline
  },
  methods: {
    ...mapMutations(['setPlayer'])
  }
};
</script>
>
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
</style>
