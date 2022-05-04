<script setup lang="ts">

</script>

<template>
  <router-view></router-view>
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
