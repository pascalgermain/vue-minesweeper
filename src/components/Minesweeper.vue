<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="game">
      <div class="message">{{ message }}</div>
      <div class="board">
        <div v-for="cellsRow in cells">
          <div v-for="cell in cellsRow" class="cell" />
        </div>
      </div>
      <button class="action" @click="restart">{{ action }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Minesweeper',
      message: '',
      action: 'Restart',
      rows: 10,
      cols: 10,
      cells: []
    }
  },
  methods: {
    restart () {
      const cells = []
      for (let row = 0; row < this.rows; ++row) {
        const cellsRow = []
        for (let col = 0; col < this.cols; ++col) {
          const id = (row * this.rows) + col
          cellsRow.push({
            id,
            mine: false,
            state: 'empty'
          })
        }
        cells.push(cellsRow)
      }
      this.cells = cells
    }
  },
  created () {
    this.restart()
  }
}
</script>

<style scoped>
h1 {
  font-weight: normal;
}

.game {
  display: inline-block;
  padding: 3px 0 3px 3px;
  background: #ccc;
}

.board {
  margin: 3px 0;
}

.cell {
  float: left;
  width: 46px;
  height: 46px;
  margin: 0 3px 3px 0;
  background: #ddd;
  cursor: pointer;
}

.message,
.action {
  height: 30px;
  background: #42b983;
  font-size: 22px;
  color: #fff;
  text-transform: uppercase;
}

.action {
  width: 100%;
  border: 0;
  outline: 0;
  cursor: pointer;
}
</style>
