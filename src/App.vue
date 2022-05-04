<script setup lang="ts">

</script>

<template>
  <NavBar></NavBar>
  <main>
    <router-view></router-view>
    <Footer></Footer>
  </main>
</template>

<style>
@import "./assets/base.css";

#app {
  margin: 0;
  padding: 0;
  font-weight: normal;
}
</style>
