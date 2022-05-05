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

.main {
  padding: 2.5rem 1.75rem;
}

a {
  text-decoration: none;
  color: currentColor;
}

.trans-move {
  transition: transform 0.3s ease;
}

.trans-enter-active,
.trans-leave-active {
  transition: all .3s ease;
}

.trans-enter-from,
.trans-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
