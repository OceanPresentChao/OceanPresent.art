<template>
    <div style="display:flex;flex-wrap:nowrap;align-items: center;">
        <div style="flex:none;margin-right: 2rem;">
            <el-avatar size="large" shape="circle" :src="avatar_url" fit="cover"></el-avatar>
        </div>
        <div>
            <h2><a :href="address" target="_blank">{{ friend_name }}</a></h2>
            <p>{{ friend_desc }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    friend_name: String,
    avatar_url: String,
    friend_desc: String,
    address: String
})
</script>

<style scoped>
h2 {
    margin-top: 1rem;
}
</style>