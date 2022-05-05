<template>
    <div>
        <a title="Toggle Theme" @click="toggleDark()">
            <Icon icon="ri-moon-line" v-show="isDark" width="20" />
            <Icon icon="ri-sun-line" v-show="!isDark" width="20" />
        </a>
    </div>
</template>

<script setup lang="ts">
import { isDark, toggleDark } from '@/utils/config';

</script>

<style scoped>
a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    transition: opacity 0.2s ease;
    opacity: 0.7;
    outline: none;
    word-break: keep-all;
}
</style>