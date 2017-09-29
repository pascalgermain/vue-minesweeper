<template>
  <div>
    <h1>Minesweeper</h1>
    <div class="game">
      <div class="message">
        {{ message }}
        <span v-if="mood" class="mood">{{ mood }}</span>
      </div>
      <div v-for="cellsRow in cells">
        <div
          v-for="cell in cellsRow"
          :class="['cell', 'cell-' + (cell.mine && show ? 'mine' : cell.state)]"
          @mouseup.left="cellClick(cell)"
          @mouseup.right="cellFlag(cell)"
          @contextmenu.prevent
        />
      </div>
      <button class="action" @click="restart">Restart</button>
      <button v-if="toggleButton" class="action" @click="toggle">Toggle</button>
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
      const max1 = Math.max(this.rows, this.cols)
      const max2 = (this.rows * this.cols) - 1
      return Math.min(max1, max2)
    },
    won () {
      return this.found === this.mines
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
      if (this.finished) return
      if (cell.state !== 'default') return
      if (cell.mine) return this.finish()
      cell.state = 'empty'
    },
    cellFlag (cell) {
      if (this.finished) return
      if (cell.state === 'default') {
        this.$nextTick(() => { cell.state = 'flag' })
        ++this.found
        if (this.won) return this.finish()
      }
      if (cell.state === 'flag') {
        this.$nextTick(() => { cell.state = 'default' })
        --this.found
      }
    },
    toggle () {
      if (this.finished) return
      this.show = !this.show
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
          const id = (row * this.rows) + col
          cellsRow.push({
            id,
            mine: false,
            state: 'default'
          })
        }
        cells.push(cellsRow)
      }
      this.cells = cells
      this.found = 0
      if (this.finished) this.show = false
      this.finished = false
      this.populate()
    }
  },
  created () {
    this.restart()
    Object.keys(this.$props).forEach(prop => { this.$watch(prop, this.restart) })
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
.cell-empty {
  margin-bottom: -3px;
}

.cell-empty {
  background: #bbb;
}

.cell:after {
  position: relative;
  top: -10px;
}

.cell-mine:after {
  content: '💣';
}

.cell-flag:after {
  content: '🚩';
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

.mood {
  position: relative;
  top: 1px;
}
</style>
