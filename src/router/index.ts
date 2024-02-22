import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import NProgress from 'nprogress';
console.log(routes);
const router = createRouter({
    // ...
    routes,
    history: createWebHistory()
})

router.beforeEach((to) => {
    NProgress.start()
    if (to.path.replace(/^\/posts\//, "").indexOf("\/") === -1) {
        router.push("/posts")
    }
})

router.afterEach((to) => {
    if (to.path === '/') {
        document.title = "OceanPresent"
    } else {
        const title = (to.meta.frontmatter && to.meta.frontmatter.title) || to.meta.title
        document.title = "OceanPresent - " + title
    }
    NProgress.done()
})

export { router }