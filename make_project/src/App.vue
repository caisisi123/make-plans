<template>
 <indexView></indexView>
</template>

<script lang="ts" setup>

import topInfo from "./page1/components/top_info.vue"
import { computed, ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import indexView from './page1/page1.vue'
const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
let day=new Date()
const toggle = () => {
  language.value = language.value === 'zh-cn' ? 'en' : 'zh-cn'
}
</script>
