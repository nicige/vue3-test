<template>
    <div style="border: 1px solid pink">
        <p>this is son template</p>
        <p>son Num: {{ sonNum }}</p>
        <p>son name: {{ sonObj.name }},son age: {{ sonObj.age }}</p>
        <button @click="addNum">add son num</button>
        <grandson/>
    </div>
</template>

<script>
import grandson from "@/components/provide-inject/grandson.vue" ;
import {ref,reactive,inject} from 'vue';

export default{
    components: {
        grandson
    },
    setup () {
        // 当没有provide numRef时 sonNum调用默认值10 并提示：injection "numRef" not found.
        const sonNum = inject('numRef',ref(10)) ;
        // inject当没有获取到父组件provide提供的值且没有默认值时 报错;
        const sonObj = inject('objReactive',reactive({'name':'clc',age:50})) ;
        const addNum = () => {
            sonNum.value ++
        }
        return {
            sonNum,sonObj,addNum
        }
    }
}
</script>

<style>
</style>