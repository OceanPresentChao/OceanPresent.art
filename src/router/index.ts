import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
console.log(routes);
const router = createRouter({
    // ...
    routes,
    history: createWebHistory()
})

export { router }