<template>
  <div class="minesweeper">
    <div class="message">
      {{ message }}
      <span v-if="mood" class="mood">{{ mood }}</span>
    </div>

    <div v-for="(cellsRow, crKey) of cells" :key="crKey">
      <div
        v-for="(cell, cKey) of cellsRow"
        :key="cKey"
        :class="['cell', 'cell-' + (cell.mine && show ? 'mine' : cell.state)]"
        :data-around="cell.around || ''"
        @click="cellClick(cell)"
        @mouseup.right="cellFlag(cell)"
        @contextmenu.prevent
      />
    </div>

    <button @click="start">Restart</button>
    <button v-if="toggleButton" @click="toggle">Toggle</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { getRandomInt } from '@/utils/common'

type Cell = {
  row: number
  col: number
  mine: boolean
  state: 'default' | 'open' | 'flag'
  around: number
}

export default defineComponent({
  props: {
    rows: { type: Number, default: 9 },
    cols: { type: Number, default: 9 },
    toggleButton: Boolean,
  },

  data() {
    return {
      cells: [] as Cell[][],
      found: 0,
      show: false,
      finished: false,
    }
  },

  computed: {
    mines(): number {
      return Math.ceil((this.rows * this.cols) / 6)
    },

    won(): boolean {
      if (this.found !== this.mines) return false
      for (let cellsRow of this.cells) {
        for (let cell of cellsRow) {
          if (cell.state === 'default') return false
        }
      }
      return true
    },

    message(): string | number {
      return this.finished ? (this.won ? 'You win' : 'You lose') : this.mines - this.found
    },

    mood(): string {
      return this.finished ? (this.won ? '😃' : '😞') : ''
    },
  },

  created() {
    this.start()
  },

  watch: {
    rows() {
      this.start()
    },

    cols() {
      this.start()
    },
  },

  methods: {
    start() {
      const cells = []
      for (let row = 0; row < this.rows; ++row) {
        const cellsRow: Cell[] = []
        for (let col = 0; col < this.cols; ++col) {
          cellsRow.push({ row, col, mine: false, state: 'default', around: 0 })
        }
        cells.push(cellsRow)
      }
      this.cells = cells
      this.found = 0
      if (this.finished) this.show = false
      this.finished = false
      this.populate()
      this.calculate()
    },

    finish() {
      this.show = true
      this.finished = true
    },

    cellClick(cell: Cell) {
      if (this.finished || cell.state !== 'default') return
      if (cell.mine) {
        this.finish()
        return
      }
      cell.state = 'open'
      if (cell.around === 0) this.propagate(cell)
      if (this.won) this.finish()
    },

    cellFlag(cell: Cell) {
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

    toggle() {
      if (!this.finished) this.show = !this.show
    },

    map(x: number, y: number, callback: (cell: Cell) => void) {
      const vectors = [
        [-1, 0],
        [-1, -1],
        [0, -1],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1],
      ]
      for (let vector of vectors) {
        const dX = x + vector[0]
        const dY = y + vector[1]
        if (dX >= 0 && dY >= 0 && dX < this.cols && dY < this.rows) {
          callback(this.cells[dY][dX])
        }
      }
    },

    propagate(cell: Cell) {
      cell.state = 'open'
      this.map(cell.col, cell.row, (cell) => {
        if (cell.state === 'default' && cell.around === 0) {
          this.propagate(cell)
          return
        }
        cell.state = 'open'
      })
    },

    calculate() {
      for (let row = 0; row < this.rows; ++row) {
        for (let col = 0; col < this.cols; ++col) {
          this.map(col, row, (cell) => {
            if (cell.mine) ++this.cells[row][col].around
          })
        }
      }
    },

    populate() {
      let mines = 0
      while (mines < this.mines) {
        const row = getRandomInt(this.rows)
        const col = getRandomInt(this.cols)
        const cell = this.cells[row][col]
        if (!cell.mine) {
          cell.mine = true
          ++mines
        }
      }
    },
  },
})
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
