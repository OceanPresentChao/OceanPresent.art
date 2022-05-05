<template>
    <div class="wrapper">
        <article ref="content">
            <slot />
        </article>
        <div v-if="route.path !== '/'">
            <router-link :to="route.path.split('/').slice(0, -1).join('/') || '/'">
                Back
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    frontmatter: Object,
})
const router = useRouter()
const route = useRoute()
console.log(props);
</script>

<style scoped>
.wrapper {
    max-width: 60%;
    margin: 0 auto;
}
</style>