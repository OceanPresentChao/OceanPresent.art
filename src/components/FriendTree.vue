<template>
    <div style="display:flex;flex-wrap:nowrap;align-items: center;margin:1rem 0;">
        <div style="flex:none;margin-right: 2rem;">
            <a :href="address" target="_blank">
                <Avatar :src="avatar_url" :size="100"></Avatar>
            </a>
        </div>
        <div>
            <p><a :href="address" target="_blank">{{ friend_name }}</a></p>
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

.avatar {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    margin-right: 2rem;
}
</style>