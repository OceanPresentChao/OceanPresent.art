<template>
    <header class="header prose">
        <router-link to="/" class="avatar">
            <span>OceanPresent</span>
        </router-link>
        <nav class="nav">
                <router-link to="/posts" title="blog">
                    <span>Blog</span>
                </router-link>
                <!-- <router-link to="/projects" title="project">
                    <span>Project</span>
                </router-link> -->
                <router-link to="/bookmarks" title="bookmark">
                    <Icon icon="carbon:bookmark" width="20" />
                </router-link>
                <a href="https://github.com/OceanPresentChao" target="_blank" title="GitHub">
                    <Icon icon="codicon:github-alt" width="20" />
                </a>
                <router-link to="/friendtree" title="FriendTree">
                    <Icon icon="ph:tree" width="20" />
                </router-link>
                <a href="https://space.bilibili.com/6389878" target="_blank" title="bilibili">
                    <Icon icon="ri:bilibili-line" width="25" />
                </a>
                <a href="https://www.zhihu.com/people/chao-hai-bo-90" target="_blank" title="ZhiHu">
                    <Icon icon="fa6-brands:zhihu" width="30" />
                </a>
                <toggle-theme></toggle-theme>
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
    flex-flow: row wrap;
    font-size: large;
    align-items: center;
}

.avatar {
    flex: 0;
    margin-left: 2rem;
    margin-right: auto;
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.5rem;
}

.nav {
    flex:none;
    display: flex;
}

@media screen and (min-width:728px) {
    .nav a{
        margin: 0 10px;
    }
}

.prose .nav {
    padding: 2rem;
    box-sizing: border-box;
}

.prose a {
    border: none;
}

.prose .nav a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    transition: opacity 0.2s ease;
    opacity: 0.7;
    outline: none;
    word-break: keep-all;
}

.prose .nav a:hover {
    opacity: 1;
    text-decoration-color: inherit;
}
</style>