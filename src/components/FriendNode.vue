<template>
    <div style="display:flex;flex-wrap:nowrap;align-items: center;margin:1rem 0;">
        <div style="flex:none;margin-right: 2rem;">
            <a :href="address" target="_blank">
                <Avatar :src="avatarUrl" :size="100"></Avatar>
            </a>
        </div>
        <div>
            <p><a :href="address" target="_blank">{{ name }}</a></p>
            <p>{{ quote }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    name: String,
    avatarUrl: String,
    quote: String,
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