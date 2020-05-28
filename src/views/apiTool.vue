<template>
    <div class="">
        <button @click="changename1">change name toRef</button>
        <p>this is obj1 name:{{ obj1.name }}</p>
        <p>this is objName:{{ objName }}</p>
        <p>--------------------------</p>
        <button @click="changename2">change name toRefs</button>
        <p>this is objdemo name:{{ objdemo.name }}, objdemo age:{{ objdemo.age }}</p>
        <p>this is obj name:{{ obj.name }}, obj age:{{ obj.age }}</p>
    </div>
</template>

<script>
import {ref, reactive, readonly, isRef, isReactive, isReadonly, isProxy, unref, toRef, toRefs} from 'vue'
export default{
    setup () {
        // isRef
        const num1 = ref(0) ;
        const num2 = 5 ;
        const num3 = '5' ;
        // console.log(isRef(num1)) ; // true
        // console.log(isRef(num2)) ; // false
        // console.log(isRef(num3)) ; // false

        // isReactive
        const obj1 = reactive({name:'lcc',age:24}) ;
        const obj2 = {name:'lcc',age:24} ;
        // console.log(isReactive(obj1)) ; // true
        // console.log(isReactive(obj2)) ; // false

        // isReadonoly
        let read1 = readonly({
            name:'tom'
        });
        let read2 = readonly(1) ;
        // console.log(isReadonly(read1)) ; // true
        // console.log(isReadonly(read2)) ; // false

        // isProxy  检查一个对象是否是由 reactive 还是 readonly 方法创建的代理。
        // console.log(isProxy(num1)) ; // false
        // console.log(isProxy(obj1)) ; // true
        // console.log(isProxy(read1)) ; // true
        // console.log(isProxy(obj2)) ; // false
        
        // unref
        // console.log(unref(num1)) ; // 0
        // console.log(unref(num2)) ; // 5
        // console.log(unref(obj1)) ; // Proxy {name: "lcc", age: 24, __v_reactive: Proxy}
        // console.log(unref(obj2)) ; // {name: "lcc", age: 24}
        // console.log(unref(read1)) ; // Proxy {name: "tom", __v_readonly: Proxy}

        // toRef
        const objName = toRef(obj1,'name') ;
        // console.log(objName.value) ; // lcc
        const changename1 = () => {
            objName.value = 'ccl'
            console.log(objName.value) // ccl
            console.log(obj1.name) // ccl
        }

        // toRefs
        const objdemo = reactive({name:'cccc',age:42})
        const obj = toRefs(objdemo)
        console.log(objdemo) // Proxy {name: "cccc", age: 42, __v_reactive: Proxy}
        console.log(obj) // {name:'cccc',age:42}
        const changename2 = () => {
            obj.name.value = 'lllll'
            obj.age.value = 34
            console.log(obj)  // {name: {…}, age: {…}, __v_reactive: Proxy} name: {__v_isRef: true} age: {__v_isRef: true}
            console.log(objdemo) // Proxy {name: "lllll", age: 34, __v_reactive: Proxy}
        }

        return {
            num1,num2,num3,
            obj1,obj2,
            read1,read2,
            objName,changename1,
            objdemo,obj,changename2
        }
    }
}
</script>

<style>
</style>