<script setup lang="ts">
import { isDark } from './utils/config';
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
  </main>
  <Sakura v-if="isDark"></Sakura>
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
  padding: 2.5rem 0;
}

a {
  text-decoration: none;
  color: currentColor;
}

h1,
h2 {
  word-break: normal;
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
  max-width: 100%;
  height: auto;
}
</style>
