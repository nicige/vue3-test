<template>
    <div style="border: 1px solid blue">
        <p>this is grandson template</p>
        <p>grandson Num: {{ grandsonNum }}</p>
        <p>grandson name: {{ grandsonObj.name }},grandson age: {{ grandsonObj.age }}</p>
        <span ref="grandsonSpan">this is span</span>
    </div>
</template>

<script>
import {ref,reactive,inject, onMounted} from 'vue';
export default{
    setup () {
        const grandsonNum = inject('numRef',ref(2))
        const grandsonObj = inject('objReactive',reactive({name:'ccl',age:20})) ;
        const grandsonSpan = ref(null) ;
        // null
        console.log(grandsonSpan.value) ;
        onMounted(() => {
            //<span>this is span</span>
            console.log(grandsonSpan.value)
        })
        return {
            grandsonNum,grandsonObj,
            grandsonSpan
        }
    }
}
</script>

<style>
</style>