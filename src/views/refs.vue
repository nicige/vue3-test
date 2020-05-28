<template>
    <div>
        <p>num:{{num}}</p>
        <span ref="refTest">this is span</span>
        <refscomp ref="comRefs" :refsChange="refsChange"/>
        <refsfor/>
    </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import refscomp from '@/components/refscomp/refscomponent.vue';
export default{
    components : {
        refscomp
    },
    setup () {
        const num = ref(1) ;
        const refTest = num ;
        // 返回：1
        console.log(refTest.value) ;

        const comRefs = ref(10) ;
        // 返回：10
        console.log(comRefs) ;

        onMounted(()=>{
            // 返回：<span style="color: red;">this is span</span>
            console.log(refTest.value) ;
            // 添加样式，字体颜色为红
            refTest.value.style.color = 'red' ;
            // 返回：10
            console.log(comRefs.value) ;
            comRefs.value.comClick() ; //父组件调用子组件方法
        })
        
        let refsChange = () => {
            refTest.value.innerHTML = 'refsTest changed' ;
        }
        
        return {
            num,refTest,comRefs,refsChange
        }
    }
}
</script>

<style>
</style>