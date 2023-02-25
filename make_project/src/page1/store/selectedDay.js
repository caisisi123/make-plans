import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/*export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})*/
export  const useSelectedDayStore=defineStore('selectDay',()=>{
    let selectDay=ref(new Date())
    function getToday(){
        console.log('today',selectDay.value);
    }
    const formatDate=computed(()=>{
        let day=selectDay.value;
        let date=`${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`//日期
        return date;
    })
    return {selectDay,getToday,formatDate}
})