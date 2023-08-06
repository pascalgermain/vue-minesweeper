<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Vue Minesweeper</h1>

    <form>
      <label for="rows">Rows</label>
      <select id="rows" v-model.number="rows">
        <option v-for="option in rowsOptions" :key="option">{{ option }}</option>
      </select>

      <label for="cols">Columns</label>
      <select id="cols" v-model.number="cols">
        <option v-for="option in colsOptions" :key="option">{{ option }}</option>
      </select>

      <label for="toggleButton">Toggle button</label>
      <input type="checkbox" id="toggleButton" v-model="toggleButton" />
    </form>

    <Minesweeper v-bind="{ rows, cols, toggleButton }" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import Minesweeper from './components/Minesweeper.vue'

export default defineComponent({
  components: { Minesweeper },

  setup() {
    const rowsOptions = [3, 6, 9, 12, 15]
    const colsOptions = [3, 6, 9, 12, 15, 18, 21]

    const rows = ref(9)
    const cols = ref(9)
    const toggleButton = ref(true)

    return { rowsOptions, colsOptions, rows, cols, toggleButton }
  },
})
</script>

<style>
#app {
  margin-top: 50px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}
</style>

<style scoped>
h1 {
  font-weight: normal;
}

form {
  margin-bottom: 30px;
}

select {
  margin-left: 4px;
  margin-right: 20px;
}

label {
  cursor: pointer;
}
</style>
