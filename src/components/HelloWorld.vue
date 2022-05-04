<script setup lang="ts">
defineProps<{
  msg: string
}>()
const count = ref(0)
function increment() {
  count.value++
}

function decrease() {
  count.value--
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a target="_blank" href="https://vitejs.dev/">Vite</a> +
      <a target="_blank" href="https://vuejs.org/">Vue 3</a>+
      <a target="_blank" href="https://vueuse.org/">VueUse</a>.
    </h3>
    <div>
      <div>
        Count:{{ count }}
      </div>
      <button @click="increment">
        add count
      </button>
      <button @click="decrease">
        decrease count
      </button>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: rgb(30, 218, 30);
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.greetings {
  text-align: center;
}
</style>
