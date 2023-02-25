<template>
  <el-calendar :range="[firstDayOfWeek,lastDayOfWeek]" v-model="day"></el-calendar>
  <div class="wrapper">
    <img :src="downDrawer">
  <el-collapse>
    <el-collapse-item :title="''">
      <el-calendar v-model="day" ref="calendar">
        <template #header="{date}">
          <el-row justify="space-between" style="border-top:1px solid plum">
            <div class="leftArrow_wrapper" @click="goto('prev-month')"><img class="leftArrow" :src="leftArrow" alt=""></div>
            <p>{{date}}</p>
            <p class="text" @click="goto('today')">to Today</p>
            <div class="rightArrow_wrapper" @click="goto('next-month')"><img class="rightArrow" :src="rightArrow" alt=""></div>
          </el-row>
        </template>
        <template #date-cell="{data}">
          <p v-if="data.isSelected" v-get-date="data">
            {{ data.day.slice(8)}}
            {{ data.isSelected ? '✔️' : '' }}
          </p>
        </template>
      </el-calendar>
    </el-collapse-item>
  </el-collapse>
  </div>
</template>

<script setup>
// 计算当前日期所在周的第一天
import {computed,ref} from "vue";
import {useSelectedDayStore} from "@/page1/store/selectedDay";
import downDrawer from '../assets/down2.png'
import leftArrow from '../assets/leftArrow.png'
import rightArrow from '../assets/rightArrow.png'
const store=useSelectedDayStore()
const day=ref(new Date())
const vGetDate={
  created:(el,binding)=>{
    // console.log('binding', binding.value.date);
    store.$patch({
      selectDay:binding.value.date
    });
    //console.log('change_date',store.formatDate);
  }
}
const calendar=ref()
function goto(val){
  calendar.value.selectDate(val)
}
const firstDayOfWeek = computed(() => {
  let date=new Date(day.value)
  const dayOfWeek = date.getDay()
  const diff = date.getDate() - dayOfWeek+1
  return new Date(date.setDate(diff))
});
// 计算当前日期所在周的最后一天
const lastDayOfWeek = computed(() => {
  const date = new Date(day.value);
  const day_of_wk=date.getDay();
  const diff=date.getDate()+(6-day_of_wk)
  return new Date(date.setDate(diff))
});
</script>

<style scoped>
 :deep( .el-calendar:nth-of-type(1) .el-calendar-table>thead){
  display: none;
}
 :deep(.el-calendar:nth-of-type(1) .el-calendar__header){
   padding: 0;
   height: 2rem;
 }
::v-deep.el-calendar:nth-of-type(2) .el-calendar__header{
   display: none;
}
:deep(.el-calendar__body){
  /* padding: 12px 20px 35px; */
  padding: 0;
}
:deep( .el-calendar-table thead th ){
  padding: 6px 0;
  color: var(--el-text-color-regular);
  font-weight: 400;
}
:deep( .el-calendar-table .el-calendar-day ){
  box-sizing: border-box;
  padding: 4px;
  text-align: center;
  height: 2rem;
  /* height: var(--el-calendar-cell-width);
   */
}
 :deep( .el-collapse-item__header){
   /*折叠时*/
   height: 1.5rem;
   padding: 0;
   opacity: 0;
 }
 :deep( .el-collapse-item .is-active){
   /*面板展开*/
   opacity: 1;
 }
 .calendar_wrapper{
   position: relative;
 }
 p{
   padding-top: 0.3rem;
 }
 .leftArrow_wrapper{
   padding-top: 0.5rem;
  position: relative;
   z-index: 9999;
 }
.leftArrow{
  width: 1.2rem;
}
.rightArrow_wrapper{
  padding-top: 0.3rem;
  padding-right: 0.1rem;
}
.rightArrow{
  position:relative;
  z-index: 999;
  width: 1.5rem;
}
 .wrapper{
   position: relative;
   border-top:1px solid pink;
 }
 .wrapper>img{
   display: block;
   height: 1.5rem;
   position: absolute;
   top:0rem;
   z-index:-1;
   left:calc(50% - 0.75rem);

 }
 .el-row{
   width: 100%;
 }
 :deep( .el-icon){
   display: none;
 }
 :deep( .el-collapse){
   position: relative;
 }
 :deep(.el-collapse-item__wrap){
   position: absolute;

   z-index: 999;
 }
</style>