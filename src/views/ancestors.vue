<template>
    <div style="border: 1px solid black">
        <p>this is ancestors</p>
        <p>ancestors num: {{num}}</p>
        <p>name: {{ obj.name }},age: {{ obj.age }}</p>
        <button @click="addNum">add ancestors num</button>
        <button @click="changeObj">change obj</button>
        <son />
    </div>
</template>

<script>
import son from "@/components/provide-inject/son.vue" ;
import {ref,reactive,provide} from 'vue'

export default{
    components: {
        son 
    },
    setup() {
        const num = ref(0) ;
        const obj = reactive({
            name : 'lcc',
            age: 70
        }) ;

        provide('numRef',num) ;
        // provide('objReactive',obj) ;

        const addNum = () => {
            num.value ++
        }
        const changeObj = () => {
            obj.name = 'lcccc' ;
            obj.age = 100 ;
        }
        return {
            num,obj,addNum,changeObj
        }
    }
}
</script>

<style>
</style>