<template>
  <div class="minesweeper">
    <h1>{{ title }}</h1>
    <div>
      <h2></h2>
      <div></div>
      <h2></h2>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Minesweeper'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
