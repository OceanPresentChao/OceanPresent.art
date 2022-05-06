import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import NProgress from 'nprogress';
console.log(routes);
const router = createRouter({
    // ...
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from) => {
    NProgress.start()
    if (to.path.replace(/^\/posts\//, "").indexOf("\/") === -1) {
        router.push("/posts")
    }
})

router.afterEach(() => {
    NProgress.done()
})

export { router }