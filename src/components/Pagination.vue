<template>
    <div>
        <div style="display:flex;justify-content:center;">
            <div class="btn-container" style="margin-left: 5em;">
                <div v-for="i in displayIndex">
                    <div class="pagination-btn" v-if="i != '#'" @click="handlePageChange(Number(i))">
                        {{ i }}
                    </div>
                    <div v-else>
                        ..
                    </div>
                </div>
            </div>
            <div>
                <span style="margin:0 1em;">Go To</span>
                <input type="text" class="jump-input" v-model="inputPage" @keyup.enter="handleInputEnter">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface PaginationProps {
    pages?: number
    pageSize?: number
    currentPage?: number
    total?: number
    onPageChange?: (page: number) => void
}

const props = withDefaults(defineProps<PaginationProps>(), {
    pageSize: 10,
    currentPage: 1,
    total: 0
})

const inputPage = ref<number | undefined>(undefined)

const pageCount = computed(() => {
    const { pageSize, pages, total } = props
    return pages ? pages : Math.ceil(total / pageSize)
})
const displayIndex = computed(() => {
    const { currentPage } = props
    const padding = 2
    const result: string[] = []
    for (let i = currentPage - padding; i <= currentPage + padding; i++) {
        if (i >= 1 && i <= pageCount.value)
            result.push(String(i))
    }
    if (Number(result[0]) - 1 > 1) {
        result.unshift('#')
        result.unshift('1')
    }
    if (pageCount.value - Number(result[result.length - 1]) > 1) {
        result.push('#')
        result.push(String(pageCount.value))
    }
    return result
})

function handlePageChange(page: number) {
    const { onPageChange } = props;
    onPageChange && onPageChange(page)
}

function handleInputEnter() {
    inputPage.value && handlePageChange(inputPage.value)
}
</script>

<style scoped>
.pagination-btn {
    font-size: medium;
    cursor: pointer;
    width: 2em;
    text-align: center;
    border: 0;
    border-radius: .5em;
}

.pagination-btn:hover {
    background-color: var(--prism-comment);
}

.btn-container {
    display: flex;
    justify-content: center;
    column-gap: 2em;
}

.jump-input {
    width: 2em;
    padding: .25em .5em;
    border-radius: .25em;
    background: transparent;
    color: currentColor;
}

.jump-input:focus {
    outline-color: var(--prism-comment);
}
</style>