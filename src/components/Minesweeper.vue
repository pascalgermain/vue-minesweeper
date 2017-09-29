<template>
  <div>
    <h1>Minesweeper</h1>
    <div class="game">
      <div class="message">{{ message }}</div>
      <div v-for="cellsRow in cells">
        <div v-for="cell in cellsRow" :class="['cell', 'cell-' + cell.state, {'cell-show': cell.mine && show}]" />
      </div>
      <button class="action" @click="restart">Restart</button>
      <button class="action" @click="toggle">Toggle</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rows: 10,
      cols: 10,
      mines: 10,
      cells: [],
      show: false,
      message: ''
    }
  },
  methods: {
    toggle () {
      this.show = !this.show
    },
    populate () {
      let mines = 0
      while (mines < this.mines) {
        const row = Math.floor(Math.random() * this.rows)
        const col = Math.floor(Math.random() * this.cols)
        const cell = this.cells[row][col]
        if (!cell.mine) {
          cell.mine = true
          ++mines
        }
      }
    },
    restart () {
      this.message = this.mines
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
      this.populate()
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

.game,
.cell {
  display: inline-block;
}

.game {
  padding: 3px 3px 0;
  background: #ccc;
  white-space: nowrap;
}

.cell {
  width: 46px;
  height: 46px;
  line-height: 52px;
  margin: 0 3px 3px 0;
  background: #ddd;
  font-size: 22px;
  cursor: pointer;
}

.cell:last-child {
  margin-right: 0;
}

.cell-empty {
  margin-bottom: -3px;
}

.cell-mine:after {
  content: '💣';
}

.cell-show {
  background: #eee;
}

.message,
.action {
  height: 30px;
  margin-bottom: 3px;
  background: #42b983;
  font-size: 20px;
  color: #fff;
  text-transform: uppercase;
}

.message {
  line-height: 32px;
}

.action {
  display: block;
  width: 100%;
  border: 0;
  outline: 0;
  cursor: pointer;
}
</style>
