<template>
    <div>
        <a title="Toggle Theme" @click="toggleDark()">
            <Icon :icon="icon" width="20" :color="isDark ? 'yellow' : 'orange'"/>
        </a>
    </div>
</template>

<script setup lang="ts">
import { isDark, toggleDark } from '@/utils/config';
const icon = ref('')

watch(isDark,(nv,ov)=>{
    if(nv){
        icon.value = 'ri-moon-line'
    }else{
        icon.value = 'ri-sun-line'
    }
},{
    immediate:true
})
</script>

<style scoped>
a {
    cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s ease;
    opacity: 0.7;
    outline: none;
    word-break: keep-all;
}
</style>