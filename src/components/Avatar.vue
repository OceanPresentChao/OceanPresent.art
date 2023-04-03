<template>
    <div>
        <div>
            <img :src="src" :alt="desc" :width="size" :height="size" class="avatar">
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    src: String,
    size:Number,
    desc:String
})
</script>

<style scoped>
.avatar {
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
}
</style>