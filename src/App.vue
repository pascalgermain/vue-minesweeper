<template>
  <div id="app">
    <img src="./assets/logo.png">
    <minesweeper v-bind="{rows, cols, toggleButton}" />
  </div>
</template>

<script>
import Minesweeper from './components/Minesweeper'

export default {
  components: {
    Minesweeper
  },
  data () {
    return {
      rows: 10,
      cols: 10,
      toggleButton: true
    }
  }
}
</script>

<style>
#app {
  margin: 50px 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}
</style>
