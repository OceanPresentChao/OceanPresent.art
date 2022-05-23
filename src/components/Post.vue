<template>
    <div class="post prose">
        <article ref="content" style="margin-bottom: 2rem;">
            <slot />
        </article>
        <div v-if="route.path !== '/'">
            <router-link :to="route.path.split('/').slice(0, -1).join('/') || '/'">
                <span>
                    <Icon icon="akar-icons:arrow-back" /> Back
                </span>
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
.post {
    max-width: 60%;
    margin: 0 auto;
}

@media screen and (max-device-width: 768px) {
    .post {
        max-width: 70%;
        margin: 0 auto;
    }
}


.prose .post a {
    border: none;
}
</style>