<template>
    <div id="index">
        <p>{{num}} &lt; {{count}}</p>
        <button @click="addNum">click,add the num</button>
        <p>name:{{obj.name}},age:{{obj.age}}</p>
        <button @click="changeName">click,add the num</button>
        <p>computed number:{{_computedNum}}</p>
        <button @click="changeComputedNum">click,change computedNumber</button>
        <p>readonly number:{{readNum}}</p>
        <button @click="tryToChangeReadNum">try to change readonly number</button>
        <br/>
        <button @click="stopLogNum">stop log num</button>
    </div>
</template>

<script>
import {ref, reactive, computed, readonly, watchEffect, watch, onMounted, onUpdated, onUnmounted} from 'vue' ;
export default {
    setup() {
        // console.log('setup,enter')
        // ref
        const num = ref(1) ;
        const count = ref(123) ;
        const addNum = () => {
            num.value ++
        } ;

        // reactive
        const obj = reactive({
            name: 'lcc',
            age: 24
        }) ;
        const changeName = () => {
            obj.name = 'ccl'
        } ;

        // computed
        /**const _computedNum = computed(() => num.value + 1 )
        // 警告：Write operation failed: computed value is readonly
        
        const changeComputedNum = () => {
            _computedNum.value ++
        }*/
        const _computedNum = computed({
            // get 中不能用 ()=> {num.value} 否则返回underfined
            get:() => num.value,
            set:(val) => {
                num.value  = val + 10
            }
        }) ;
        const changeComputedNum = () => {
            _computedNum.value = 10
        } ;

        // readonly
        let readNum = readonly(num) ;
        // 警告：reactivity.esm-bundler.js?a1e9:307 Set operation on key "value" failed: target is readonly. 
        let tryToChangeReadNum = () => {
            readNum.value ++ ;
        } ;

        // watchEffect
        // 实时打印num的值,监听num的变化
        // 停止侦听，终止打印
        const stopLogNum = watchEffect(() => console.log('watchEffect:' + num.value))
        // const stopLogNum = watchEffect(() => {console.log(num.value)})
        // 每隔一秒打印一次
        /**setInterval(()=>{
            num.value ++ 
            // 再次打印
        },1000)*/

        // watch
        // 侦听ref
        watch(num, (num,prevNum) => {
            console.log('watchRef:' + num,prevNum)
        })
        // 侦听reactive
        watch(() => obj.name, (name,prevName) => {
            console.log('watchName:' + name,prevName)
        })
        // 同时侦听多个数据源
        watch([num,obj], ([num,obj],[prevNum,prevObj]) => {
            console.log('watchNum:' + num,prevNum + '; watchName:' + obj.name,prevObj.name)
        })
        
        // 生命周期子函数
        onMounted(() => {
            console.log('setup,enter Mounted')
        })
        onUpdated(() => {
            console.log('setup,enter updated')
        })
        onUnmounted(() => {
            console.log('setup,enter unmounted')
        })

        return {
            // ref
            num,count,addNum,
            // reactive
            obj,changeName,
            // computed
            _computedNum,changeComputedNum,
            // readonly
            readNum,tryToChangeReadNum,
            // watchEffect
            stopLogNum,
            // watch
        }
    },
    beforeCreate() {
        // console.log('beforeCreate,enter')
    },
    created() {
        // console.log('before,enter')
    },
    methods: {
        // addNum() {
        //     this.num ++
        // }
    },
    mounted () {
        console.log('mounted,enter')
    },
    updated () {
        console.log('udated,enter')
    }
}
</script>

<style>
#index {
    text-align: center;
}
</style>
