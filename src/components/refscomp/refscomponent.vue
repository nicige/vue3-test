<template>
    <div class="">
        <p>--------------------</p>
        <p>{{msg}}</p>
        <button @click="childClick">child click</button>
    </div>
</template>

<script>
import {ref, onMounted} from 'vue'
export default{
    props : {
        refsChange: Function
    },
    setup (props) {
        const msg = ref('childComponent');
        let comClick = () => {
            msg.value = 'msg is changed'
        }
        let childClick = () => {
            console.log(props) ;
            props.refsChange() ; //子组件调用父组件方法
        }
        onMounted(() => {
            console.log(msg.value)
        })
        return {
            msg,comClick,childClick
        }
    }
}
</script>

<style>
</style>