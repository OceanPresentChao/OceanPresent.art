<template>
    <div style="text-align: center;margin-top: 1rem;" class="prose">
        <p>This website has running for
            <template v-for="(value, key) in runningDuration">
                <span v-show="value"> {{ value }}{{ key }}</span><span>&nbsp;</span>
            </template>
        </p>
        <p>
            <a href="beian.miit.gov.cn" target="_blank">皖ICP备2021007094号 </a>
            <span> 2021-PRESENT © OceanPresent</span>
        </p>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration)
const starttime = 1651623106000
const timestamp = useTimestamp({ offset: 0 })
const durationSecond = computed(() => timestamp.value - starttime)
const runningDuration = computed(() => ({
    years: dayjs.duration(durationSecond.value).years(),
    months: dayjs.duration(durationSecond.value).months(),
    days: dayjs.duration(durationSecond.value).days(),
    hours: dayjs.duration(durationSecond.value).hours(),
    minutes: dayjs.duration(durationSecond.value).minutes(),
    seconds: dayjs.duration(durationSecond.value).seconds(),
}))
</script>

<style scoped>
</style>