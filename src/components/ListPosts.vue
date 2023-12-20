<template>
    <div>
        <div class="cateBox">
            <div>
                <router-link to="/posts/hard-boiled-wonderland/">冷酷仙境</router-link>
                <Icon icon="noto:wind-chime" />
            </div>
            <div>
                <router-link to="/posts/end-of-the-world/">世界尽头</router-link>
                <Icon icon="noto-v1:maple-leaf" />
            </div>
        </div>
        <transition-group name="trans" leave-active-class="list-leave-active">
            <div v-for="route in displayRoutes" :key="route.path" class="item">
                <div>
                    <div class="postTitle">
                        <router-link :to="route.path">{{ route.title || "Untitled Blog" }}</router-link>
                    </div>
                    <div class="postInfo">
                        <div>
                            <span>
                                <Icon icon="healthicons:i-schedule-school-date-time" width="30"
                                    style="position:relative;top:0.5rem" />
                                {{ route.time || "它遗失在时间的长河里..." }}
                            </span>
                            <span style="margin:5px;"></span>
                            <span>
                                <Icon icon="bx:book-reader" width="30" style="position:relative;top:0.5rem" />
                                {{ route.author || "佚名" }}
                            </span>
                        </div>
                        <div>
                            <router-link :to="route.path">Read Me...</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </transition-group>
        <footer>
            <Pagination :current-page="curPage" :total="totalPosts" :page-size="pageSize" :on-page-change="onPageChange" />
        </footer>
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
const route = useRoute()
const routes: Post[] = router.getRoutes().filter((item) => {
    const match = item.path.match(/^\/posts\/([\w-!]+\/)+([\w-!]+)$/) || []
    const postName = match[2]
    return match && postName
}).map((item) => {
    return {
        path: item.path,
        ...(item.meta.frontmatter as Object)
    }
}).sort((a: any, b: any) => {
    return dayjs(a.time).isAfter(b.time) ? -1 : 1
})
const curPage = ref(1)
const pageSize = ref(10)
const params = useUrlSearchParams('history')
const filterRoutes = computed(() => {
    return routes.filter((r) => r.path.startsWith(route.path))
})
const displayRoutes = computed(() => {
    const page = Number(params.page) || 1
    return filterRoutes.value.slice((page - 1) * pageSize.value, page * pageSize.value)
})

const totalPosts = computed(() => filterRoutes.value.length)

function onPageChange(page: number) {
    params.page = String(page)
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

.postTitle {
    font-size: x-large;
    font-weight: 600;
    margin: 5px 0;
}

.postInfo {
    vertical-align: middle;
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