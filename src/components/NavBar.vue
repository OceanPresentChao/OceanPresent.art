<template>
    <header class="header">
        <router-link to="/" style="position:fixed">
            <el-avatar size="large" shape="circle" src="http://q1.qlogo.cn/g?b=qq&nk=1255342403&s=640" fit="cover">
            </el-avatar>
        </router-link>
        <nav class="nav">
            <div class="spacer"></div>
            <el-space size="large">
                <router-link to="/posts">
                    <span>BLOG</span>
                </router-link>
                <router-link to="/projects">
                    <span>Projects</span>
                </router-link>
                <a href="https://github.com/OceanPresentChao" target="_blank" title="GitHub">
                    <span>GitHub</span>
                </a>
                <a href="https://space.bilibili.com/6389878" target="_blank" title="bilibili">
                    <span>bilibili</span>
                </a>
                <a href="https://www.zhihu.com/people/chao-hai-bo-90" target="_blank" title="ZhiHu">
                    <span>知乎</span>
                </a>
                <a href="https://www.zhihu.com/people/chao-hai-bo-90" target="_blank" title="ZhiHu">
                    <span>RSS</span>
                </a>
            </el-space>
        </nav>
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
.header {
    margin: 0;
    z-index: 27;
}

.nav {
    width: 100%;
    padding: 2rem;
    display: flex;
    flex-flow: row nowrap;
    box-sizing: border-box;
}

.nav a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    transition: opacity 0.2s ease;
    opacity: 0.7;
    outline: none;
}

.spacer {
    flex: 1;
}
</style>