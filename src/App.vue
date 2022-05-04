<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <main>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <div>
      <HelloWorld msg="You did it!" />
    </div>
  </main>
</template>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
