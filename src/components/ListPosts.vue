<template>
    <div class="wrapper">
        <div v-for="route in routes" :key="route.path" class="item">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <template #header>
                    <h1>
                        <router-link :to="route.path">{{ route.title || "Untitled Blog" }}</router-link>
                    </h1>
                </template>
                <div style="padding: 14px;vertical-align:middle;">
                    <span>
                        <Icon icon="healthicons:i-schedule-school-date-time" width="30"
                            style="position:relative;top:0.5rem" />
                        {{ route.time || "它遗失在时间的长河里..." }}
                    </span>
                    <el-button type="text" style="margin-left: 2rem;">
                        <router-link :to="route.path">Read Me...</router-link>
                    </el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Post {
    title?: string
    path?: string
    author?: string
    time?: string
    lang?: string
    subtitle?: string
}
const router = useRouter()
const routes: Post[] = router.getRoutes().filter((item) =>
    item.path.startsWith("/posts/")
).map((item) => {
    return {
        title: String(item.name),
        ...item
    }
})
</script>

<style scoped>
.item {
    margin-bottom: 2rem;
}
</style>