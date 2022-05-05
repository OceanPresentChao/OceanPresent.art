<template>
    <header class="header">
        <router-link to="/" class="avater">
            <span>OceanPresent</span>
        </router-link>
        <div class="spacer"></div>
        <nav class="nav">
            <el-space size="large" style="align-items:center;">
                <router-link to="/posts" title="blog">
                    <span>Blog</span>
                </router-link>
                <router-link to="/projects" title="project">
                    <span>Project</span>
                </router-link>
                <router-link to="/bookmarks" title="bookmark">
                    <Icon icon="carbon:bookmark" width="20" />
                </router-link>
                <a href="https://github.com/OceanPresentChao" target="_blank" title="GitHub">
                    <Icon icon="codicon:github-alt" width="20" />
                </a>
                <a href="https://space.bilibili.com/6389878" target="_blank" title="bilibili">
                    <Icon icon="ri:bilibili-line" width="25" />
                </a>
                <a href="https://www.zhihu.com/people/chao-hai-bo-90" target="_blank" title="ZhiHu">
                    <Icon icon="fa6-brands:zhihu" width="30" />
                </a>
                <a href="https://www.zhihu.com/people/chao-hai-bo-90" target="_blank" title="RSS">
                    <Icon icon="bi:rss" width="20" />
                </a>
                <toggle-theme></toggle-theme>
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
    display: flex;
    flex-flow: row nowrap;
    font-size: large;
    align-items: center;
}

.avater {
    flex: none;
    margin-left: 2rem;
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.5rem;
}

.nav {
    padding: 2rem;
    box-sizing: border-box;
}

.nav a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    transition: opacity 0.2s ease;
    opacity: 0.7;
    outline: none;
    word-break: keep-all;
}

.spacer {
    flex: 1;
}
</style>