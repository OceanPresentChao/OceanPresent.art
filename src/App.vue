<script setup lang="ts">

</script>

<template>
  <NavBar></NavBar>
  <main class="main">
    <router-view v-slot="{ Component }">
      <transition name="trans" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer></Footer>
    <el-backtop :right="50" :bottom="50" />
  </main>
</template>

<style>
@import "@/style/prose.css";
@import "@/style/main.css";
@import "@/style/markdown.css";

#app {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

.main {
  padding: 2.5rem 1.75rem;
}

a {
  text-decoration: none;
  color: currentColor;
}

h1,
h2 {
  word-break: break-all;
}

.trans-move {
  transition: transform 0.5s ease;
}

.trans-enter-active,
.trans-leave-active {
  transition: all .5s ease;
}

.trans-enter-from,
.trans-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.img-center img {
  display: block;
  margin: auto;
}
</style>
