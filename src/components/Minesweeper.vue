<template>
  <div class="minesweeper">
    <h1>{{ title }}</h1>
    <div class="game">
      <div class="message">{{ message }}</div>
      <div class="board"></div>
      <button class="action">{{ action }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Minesweeper',
      message: '',
      action: 'Start'
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: normal;
}

.game {
  display: inline-block;
  padding: 3px;
  background: #ccc;
}

.board {
  width: 500px;
  height: 500px;
  margin: 3px 0;
  background: #ddd;
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
