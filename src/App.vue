<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>Minesweeper</h1>
    <form>
      <label for="rows">Rows</label>
      <select id="rows" v-model.number="rows">
        <option>5</option>
        <option>10</option>
        <option>15</option>
        <option>20</option>
      </select>
      <label for="cols">Columns</label>
      <select id="cols" v-model.number="cols">
        <option>5</option>
        <option>10</option>
        <option>15</option>
        <option>20</option>
      </select>
      <label for="toggleButton">Toggle button</label>
      <input type="checkbox" id="toggleButton" v-model="toggleButton">
    </form>
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

<style scoped>
#app {
  margin: 50px 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}

h1 {
  font-weight: normal;
}

form {
  margin-bottom: 30px;
}

select {
  margin-right: 20px;
}

label {
  cursor: pointer
}
</style>
