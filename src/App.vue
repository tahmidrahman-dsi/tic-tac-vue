<template>
  <div id="app">
    <Grid />
    <Overlay v-show="!isGameInProgress" />
  </div>
</template>

<script>
import Overlay from './components/Overlay';
import Grid from './components/Grid';

export default {
  components: {
    Overlay,
    Grid
  },
  computed: {
    isGameInProgress() {
      return this.$store.state.isGameInProgress;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
#app {
  font-family: 'Noto Sans', sans-serif;
  color: #2c3e50;
}
</style>
