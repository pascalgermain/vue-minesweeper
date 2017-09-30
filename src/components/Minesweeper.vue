<template>
  <div class="minesweeper">
    <div class="message">
      {{ message }}
      <span v-if="mood" class="mood">{{ mood }}</span>
    </div>
    <div v-for="cellsRow of cells">
      <div
        v-for="cell of cellsRow"
        :class="['cell', 'cell-' + (cell.mine && show ? 'mine' : cell.state)]"
        :data-around="cell.around || ''"
        @click="cellClick(cell)"
        @mouseup.right="cellFlag(cell)"
        @contextmenu.prevent
      />
    </div>
    <button @click="restart">Restart</button>
    <button v-if="toggleButton" @click="toggle">Toggle</button>
  </div>
</div>
</template>

<script>
export default {
  props: {
    rows: {
      type: Number,
      default: 10
    },
    cols: {
      type: Number,
      default: 10
    },
    toggleButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cells: [],
      found: 0,
      show: false,
      finished: false
    }
  },
  computed: {
    mines () {
      return Math.ceil((this.rows * this.cols) / 6)
    },
    won () {
      if (this.found !== this.mines) return false
      for (let cellsRow of this.cells) {
        for (let cell of cellsRow) {
          if (cell.state === 'default') return false
        }
      }
      return true
    },
    message () {
      if (this.finished) return this.won ? 'You win' : 'You lose'
      return this.mines - this.found
    },
    mood () {
      if (this.finished) return this.won ? '😃' : '😞'
      return ''
    }
  },
  methods: {
    finish () {
      this.show = true
      this.finished = true
    },
    cellClick (cell) {
      if (this.finished || cell.state !== 'default') return
      if (cell.mine) {
        this.finish()
        return
      }
      cell.state = 'open'
      if (cell.around === 0) this.propagate(cell)
      if (this.won) this.finish()
    },
    cellFlag (cell) {
      if (this.finished) return
      if (cell.state === 'default') {
        cell.state = 'flag'
        ++this.found
      } else if (cell.state === 'flag') {
        cell.state = 'default'
        --this.found
      }
      if (this.won) this.finish()
    },
    toggle () {
      if (this.finished) return
      this.show = !this.show
    },
    map (x, y, callback) {
      const vectors = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]]
      for (let vector of vectors) {
        const dX = x + vector[0]
        const dY = y + vector[1]
        if (dX >= 0 && dY >= 0 && dX < this.cols && dY < this.rows) {
          callback(this.cells[dY][dX])
        }
      }
    },
    propagate (cell) {
      cell.state = 'open'
      this.map(cell.col, cell.row, cell => {
        if (cell.state === 'default' && cell.around === 0) {
          this.propagate(cell)
          return
        }
        cell.state = 'open'
      })
    },
    calculate () {
      for (let row = 0; row < this.rows; ++row) {
        for (let col = 0; col < this.cols; ++col) {
          this.map(col, row, cell => {
            if (cell.mine) ++this.cells[row][col].around
          })
        }
      }
    },
    random (max) {
      return Math.floor(Math.random() * max)
    },
    populate () {
      let mines = 0
      while (mines < this.mines) {
        const row = this.random(this.rows)
        const col = this.random(this.cols)
        const cell = this.cells[row][col]
        if (!cell.mine) {
          cell.mine = true
          ++mines
        }
      }
    },
    restart () {
      const cells = []
      for (let row = 0; row < this.rows; ++row) {
        const cellsRow = []
        for (let col = 0; col < this.cols; ++col) {
          cellsRow.push({
            row,
            col,
            mine: false,
            state: 'default',
            around: 0
          })
        }
        cells.push(cellsRow)
      }
      this.cells = cells
      this.found = 0
      if (this.finished) this.show = false
      this.finished = false
      this.populate()
      this.calculate()
    }
  },
  watch: {
    rows () {
      this.restart()
    },
    cols () {
      this.restart()
    }
  },
  created () {
    this.restart()
  }
}
</script>

<style scoped>
.minesweeper,
.cell {
  display: inline-block;
}

.minesweeper {
  padding: 3px 3px 0;
  background: #ccc;
  white-space: nowrap;
}

.cell {
  width: 46px;
  height: 46px;
  line-height: 72px;
  margin: 0 3px 3px 0;
  background: #ddd;
  font-size: 22px;
  cursor: pointer;
}

.cell:last-child {
  margin-right: 0;
}

.cell-default,
.cell-open {
  margin-bottom: -3px;
}

.cell-open {
  background: #bbb;
}

.cell:after {
  position: relative;
  top: -10px;
}

.cell-open:after {
  top: -12px;
  font-size: 20px;
  content: attr(data-around);
}

.cell-mine:after {
  content: '💣';
}

.cell-flag:after {
  content: '🚩';
}

.message,
button {
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

button {
  display: block;
  width: 100%;
  border: 0;
  outline: 0;
  cursor: pointer;
}

.mood {
  position: relative;
  top: 1px;
}
</style>
