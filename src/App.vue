<template>
  <div id="app">
    <Grid />
    <transition name="fade">
      <Overlay v-show="!isGameInProgress" />
    </transition>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
