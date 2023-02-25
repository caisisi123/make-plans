<template>
  <div class="wrapper">
    <el-row justify="space-around">
      <el-col v-for="(msg,index) in msg1" :span="12">
        <el-card shadow="never" class="card">
          <h4 class="header">{{msg.header}}</h4>
          <divider :color="msg.color"></divider>
          <div class="output" @click="dealInput(msg,$event);">
            <template v-if="today&&today[index]&&today[index].length">
              <p  v-for="(item,i) in today[index]">
              <el-checkbox :true-value="'true'" v-model="storage[get_key(store.formatDate,item,i)]" size="default" @change="checkBoxChange($event,i,item)"  :label="item"></el-checkbox>
<!--                {{storage[get_key(store.formatDate,item,i)]}}-->
              </p>
            </template>
          </div>
        </el-card>
      </el-col>
<!--      <el-col  :span="12" >
        <el-card shadow="never" class="card">
          <h4 class="header">{{msg1[0].header}}</h4>
          <divider :color="msg1[0].color"></divider>
          <div class="output" @click="dealInput(msg1[0]);">
            <template v-if="today[0].length">
            <p  v-for="item in today[0]">{{item}}</p>
            </template>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never" class="card">
          <h4 class="header">{{msg1[1].header}}</h4>
          <divider :color="msg1[1].color"></divider>
          <div class="output" @click="dealInput(msg1[1]);">
            <template v-if="today[1].length">
            <p  v-for="item in today[1]">{{item}}</p>
            </template>
          </div>
        </el-card>
      </el-col>-->
    </el-row>
    <el-row justify="space-around">
      <el-col v-for="(msg,index) in msg2" :span="12">
        <el-card shadow="never" class="card">
          <h4 class="header">{{msg.header}}</h4>
          <divider :color="msg.color"></divider>
          <div class="output" @click="dealInput(msg,$event);">
            <template v-if="today&&today[index+2]&&today[index+2].length">
              <p  v-for="(item,i) in today[index+2]">
                <el-checkbox v-model="storage[get_key(store.formatDate,item,i)]" size="default" @change="checkBoxChange($event,i,item)" :label="item"></el-checkbox>
              </p>
            </template>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-drawer v-model="drawer" direction="btt">
      <template #header>
        <p :style="{backgroundColor:color,textAlign:'center',borderRadius:'2rem'}">{{ title }}</p>
      </template>
      <el-input ref="input" v-model="text"  :autosize="{ minRows: 2 }" autofocus="true" placeholder="我准备做..." :style="{fontSize:'1.1rem'}" >
        <template #append>
            <div class="confirm_wrapper" @click="storeText">
              <img :src="confirm" alt="">
            </div>
        </template>
      </el-input>
    </el-drawer>
  </div>
</template>

<script setup>
import divider from './cardsDivide.vue'
import {computed, reactive, ref, watch, watchEffect} from 'vue';
import confirm from '../assets/confirm.png'
import {storeContext,findIndex,storage} from '../store/localStorage'

console.log(storage);
let yellow='yellow'
const msg1=[{header:'紧急不重要',color:'yellow'},
  {header:'重要且紧急',color:'pink'},]
const msg2=[{header:'不重要不紧急',color:'skyblue'},
  {header:'重要不紧急',color:'greenyellow'}]
const drawer=ref(false)
import {useSelectedDayStore} from "@/page1/store/selectedDay";
import{store_check,get_check,get_key} from "@/page1/store/storeCheck";
const store=useSelectedDayStore()
let title='';
let color='';
let text=ref('')
let today=ref(storage.value[store.formatDate])
watchEffect(()=>{
  today.value=storage.value[store.formatDate]
})
function checkBoxChange(event,i,item){
  store_check(store.formatDate,item,i,event)
}
function dealInput(item,event){
  if(event.target.classList[0]==='output'){
    drawer.value=true;
  }
  title=item.header;
  color=item.color;
}
function storeText(){
  drawer.value=false;
  const index=findIndex(title)
  if(!today.value){
    today.value=[]
  }
  if(!today.value[index]){
    today.value[index]=[]
  }
  today.value[index].push(text.value);
  storeContext(store.formatDate,title,text.value)
  text.value='';
}
</script>

<style scoped>
.el-card{
  padding:0;
  border-color: pink;

}
.el-checkbox{
  position: relative;
  z-index: 99;
}
.header{
  text-align: center;
}
 /*::v-deep .el-card__body {
  padding:0rem;
}*/
 :deep(.el-card__body){
   padding:0rem;
 }
 .output{
   height: 11rem;
 }
 :deep(.el-drawer__header){
   margin:0
 }

.confirm_wrapper img{
  width: 1.52rem;
  vertical-align: middle;
}
:deep( .el-input-group__append ){
  padding:0
}
div.output{
  padding: 0.5rem;
}
.clear_button{

}
</style>