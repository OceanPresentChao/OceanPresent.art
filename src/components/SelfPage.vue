<template>
    <div class="wrapper">
        <div class="avatar">
            <el-avatar :size="200" shape="circle" :src="AVATAR_URL" fit="cover"></el-avatar>
            <h1>OceanPresent</h1>
            <h2>Can you hear me?</h2>
            <div class="icon-box">
                <a href="https://github.com/OceanPresentChao" target="_blank" title="GitHub">
                    <Icon icon="codicon:github-alt" width="20" />
                </a>
                <a href="https://space.bilibili.com/6389878" target="_blank" title="bilibili">
                    <Icon icon="ri:bilibili-line" width="25" />
                </a>
                <a href="https://www.zhihu.com/people/chao-hai-bo-90" target="_blank" title="ZhiHu">
                    <Icon icon="fa6-brands:zhihu" width="30" />
                </a>
                <a href="https://music.163.com/#/user/home?id=420094677" target="_blank" title="NetEase Cloud Music">
                    <Icon icon="arcticons:wynk-music" width="20" />
                </a>
            </div>
        </div>
        <div class="desc">
            <h1>Who am I</h1>
            <p>
                Hello,I'm OceanPresent,a postgraduate student in the Department of Software Engineer of JLU.
            </p>
            <p>I concentrate on Frontend technology.We learn knowledge to understand the world better,but the key is to
                make the world better.I hope that I can dream up more interesting ideas and make them come true,so that
                you can hear me.</p>
            <p>Outside of programing,I also like watching animation and drawing.I dream of compositing my own animation
                one day.</p>
            <p>If you have same hobbies with me,I really welcome you to contact with me,waiting to progress together
                with you!</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const AVATAR_URL = "http://q1.qlogo.cn/g?b=qq&nk=1255342403&s=640"
</script>

<style scoped>
.wrapper {
    display: flex;
}

.avatar {
    flex: none;
    text-align: center;
}

.desc {
    margin-left: 2rem;
}

.desc p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

h1 {
    font-size: 2rem;
}

h2 {
    color: grey;
    font-size: 1.25rem;
}

.icon-box {
    display: flex;
    justify-content: space-around;
    flex-flow: row wrap;
    width: 70%;
    margin: 0 auto;
    margin-top: 1rem;
}
</style>