<route lang="yaml">
  meta:
      title: Friends
</route>

<template>
  <div>
    <Post>
      <FriendNode v-for="v in friends" :name="v.name" :quote="v.quote" :address="v.address" :avatarUrl="v.avatarUrl" />
    </Post>
  </div>
</template>

<script setup lang="ts">
interface Friend {
  name: string
  quote: string
  avatarUrl: string
  address?: string
}
const friends: Friend[] = [
  {
    name: '洛玖只',
    quote: 'JaCppPyRugothon，JsCssHtSpVuBoot。All_In_One!',
    avatarUrl: 'http://q1.qlogo.cn/g?b=qq&nk=513979437&s=640',
    address: 'http://blog.yurzi.net/'
  },
  {
    name: 'Mutex',
    quote: '辛夸高岭桂    将徙北冥鹏',
    avatarUrl: 'http://q1.qlogo.cn/g?b=qq&nk=2468691031&s=640',
  },
  {
    name: 'HocRiser',
    quote: '朝汐',
    avatarUrl: 'http://q1.qlogo.cn/g?b=qq&nk=3568767137&s=640',
    address: 'https://hocriser01.github.io/'
  },
  {
    name: 'yirannn',
    quote: 'Inspire Creativity Enrich Life',
    avatarUrl: 'http://q1.qlogo.cn/g?b=qq&nk=1438867788&s=640',
    address: 'https://yirannn.com/'
  }
]
</script>

<style scoped></style>
