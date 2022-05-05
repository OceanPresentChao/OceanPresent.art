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
@import "@/style/base.css";
@import "@/style/main.css";

#app {
  margin: 0;
  padding: 0;
  font-weight: normal;
}
</style>
