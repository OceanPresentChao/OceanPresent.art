<template>
    <div>
        <div class="cateBox">
            <div>
                <a href="#" @click.prevent="filterCategory('Hard-Boiled-Wonderland')">冷酷仙境</a>
                <Icon icon="noto:wind-chime" />
            </div>
            <div>
                <a href="#" @click.prevent="filterCategory('End-of-the-World')">世界尽头</a>
                <Icon icon="noto-v1:maple-leaf" />
            </div>
        </div>
        <transition-group name="trans" leave-active-class="list-leave-active">
            <div v-for="route in filterRoutes" :key="route.path" class="item">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                    <template #header>
                        <h1>
                            <router-link :to="route.path">{{ route.title || "Untitled Blog" }}</router-link>
                        </h1>
                    </template>
                    <div style="padding: 14px;vertical-align:middle;" class="post-info">
                        <span>
                            <Icon icon="healthicons:i-schedule-school-date-time" width="30"
                                style="position:relative;top:0.5rem" />
                            {{ route.time || "它遗失在时间的长河里..." }}
                        </span>
                        <span>
                            <Icon icon="bx:book-reader" width="30" style="position:relative;top:0.5rem" />
                            {{ route.author || "佚名" }}
                        </span>

                        <el-button type="text">
                            <router-link :to="route.path">Read Me...</router-link>
                        </el-button>
                    </div>
                </el-card>
            </div>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

interface Post extends Object {
    title?: string
    author?: string
    time?: string
    lang?: string
    subtitle?: string
    categories?: string
    path: string
}
const router = useRouter()
const routes: Post[] = router.getRoutes().filter((item) =>
    item.path.startsWith("/posts/")
).map((item) => {
    return {
        path: item.path,
        ...(item.meta.frontmatter as Object)
    }
}).sort((a: any, b: any) => {
    return dayjs(a.time).isAfter(b.time) ? -1 : 1
})
let filterRoutes = ref<Post[]>([])
filterCategory("Hard-Boiled-Wonderland")
function filterCategory(str: string) {
    filterRoutes.value = routes.filter((r) => r.path.includes(str.toLowerCase()))
}
</script>

<style scoped>
.item {
    margin-bottom: 2rem;
}

a {
    border: none;
    color: currentColor
}

h1 {
    margin-bottom: 0.5rem;
    color: initial;
    font-size: 1.75rem;
}

.cateBox {
    font-size: 2rem;
    margin-bottom: 2rem;
    display: flex;
}

.cateBox div {
    margin-right: 2rem;
}

.post-info span {
    margin-right: 1rem;
}

.list-leave-active {
    position: absolute;
}
</style>