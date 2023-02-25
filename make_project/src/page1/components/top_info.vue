<template>
  <div  class="wrapper" :style="{backgroundImage:'url('+bgUrl+')'}">
  <el-row style="height: 2.5rem"></el-row>
  <el-row  class="top_container" :align="middle">
  <el-col :align="bottom" :span="3" ><el-avatar  :src="imgUrl" ></el-avatar></el-col>
  <el-col :span="1.5" offset="2"><div class="date"><p>{{year}}.</p><p>{{month}}月{{day}}日</p></div></el-col>
  <el-col :span="14"></el-col>
  <el-col  :align="middle" :span="1"><el-avatar :src="notUrl" shape="circle" size="default"></el-avatar></el-col>
</el-row>
  </div>
</template>

<script setup>
import {computed, defineProps} from "vue";
import avar from '../icons/avar.vue'
import imgUrl from "../assets/avar.png"
import notUrl from "../assets/message.png"
import bgUrl from "../assets/img.png"
let today=new Date()
console.log(today);
let year=computed(()=>today.getFullYear().toString())
let month=computed(()=>(today.getMonth()+1).toString().padStart(2,'0'))
let day=computed(()=>(today.getDate()).toString().padStart(2,'0'))
//console.log(typeof today.getFullYear()) number
</script>

<style scoped>
.wrapper{
  text-align: center;
  background-size: contain;
}
.top_container {

  padding: 0.3rem;
  padding-bottom: 0;
}


</style>