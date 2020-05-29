<template>
    <div class="">
        <p>this is arApis</p>
        <p>refNum:{{refNum}}</p>
        <p>shallowReactiveObj name:{{shallowReactiveObj.name}}, shallowReactiveObj age:{{shallowReactiveObj.info.age}}</p>
        <p>shallowReadonlyObj name:{{shallowReadonlyObj.name}}, shallowReadonlyObj age:{{shallowReadonlyObj.info.age}}</p>
        <p>baseObj name:{{baseObj.name}}, baseObj age:{{baseObj.info.age}}</p>
        <p>shallowRefObj name:{{shallowRefObj.name}}, shallowRefObj age:{{shallowRefObj.info.age}}</p>
    </div>
</template>

<script>
import { customRef, markRaw, reactive, isReactive, shallowReactive, shallowReadonly, isReadonly, shallowRef, readonly, toRaw } from 'vue'
export default{
    setup () {
        // custonRrf 自定义一个ref
        const cusRefs = (value) => {
            return customRef((track,trigger) => {
                return {
                    get () {
                        // console.log('enter get')
                        track() ;
                        // console.log(value)
                        // 4
                        return value ;
                    },
                    set (newValue) {
                        // console.log('enter set')
                        value = newValue ;
                        // console.log(value)
                        // 10
                        trigger() ;
                    }
                }
            })
        }
        const refNum = cusRefs(4) ;
        setTimeout (() => {
            // console.log('change num')
            refNum.value = 10 ;
            // console.log("num has changed")
            
        },3000)

        // markRaw
        const obj = markRaw({
            name: 'lcc',
            info: {
                age: 24,
                hobby: 'basketball'
            }
        })
        // console.log(isReactive(obj)) ; // false
        // console.log(isReactive(reactive(obj))) ;  // false
        // console.log(isReactive(obj.info)) // false
        // console.log(isReactive(reactive(obj.info))) // true
        const objs = reactive({obj})
        // console.log(isReactive(objs)) // true
        // console.log(objs.obj) //{name: "lcc", info: {…}, __v_skip: true}
        // console.log(isReactive(objs.obj)) // false

        // shallowReactive
        const shallowReactiveObj = shallowReactive({
            name: 'lcc',
            info: {
                age: 24,
                hobby: 'basketball'
            }
        })
        // console.log(isReactive(shallowReactiveObj)) ; // true
        // console.log(isReactive(shallowReactiveObj.info)) // false
        setTimeout(() => {
            shallowReactiveObj.name = 'ccl'
        },3000)
        // 不会响应式更新，当setTimeout更新响应式的shallowReactiveObj.name的时候 视图才会更新 
        // 即当setInterval 跳转了3次后（3秒） setTimeout 跳转1次（3秒）后视图更新
        setInterval(() => {
            shallowReactiveObj.info.age++
            // console.log(shallowReactiveObj)
        },1000)

        // shallowReadonly
        const shallowReadonlyObj = shallowReadonly({
            name: 'lcc',
            info: {
                age: 24,
                hobby: 'basketball'
            }
        })
        // console.log(isReadonly(shallowReadonlyObj)) ; // true
        // console.log(isReadonly(shallowReadonlyObj.info)) // false
        // console.log(isReactive(shallowReadonlyObj.info)) // false
        setTimeout(() => {
            shallowReadonlyObj.name = 'ccl'
            // console.log(shallowReadonlyObj.name) // lcc 不允许修改
        },3000)
        setInterval(() => {
            shallowReadonlyObj.info.age++
            // 视图上不更新 但是允许修改
            // console.log(shallowReadonlyObj)
        },1000)

        // 非响应式
        const baseObj = {
            name: 'lcc',
            info: {
                age: 24,
                hobby: 'basketball'
            }
        }
        // 视图不会发生变化
        setTimeout(() => {
            baseObj.name = 'ccl'
        },3000)

        // shallowRef
        const shallowRefObj = shallowRef({
            name: 'lcc',
            info: {
                age: 24,
                hobby: 'basketball'
            }
        })
        // console.log(shallowRefObj.value)
        setTimeout(() => {
            shallowRefObj.value.name = 'ccl'
            // console.log(shallowRefObj.value.name) // 发生更改，但视图没有响应更新
        },3000)
        setInterval(() => {
            shallowRefObj.value.info.age++
            // 视图上不更新
            // console.log(shallowRefObj.value.info.age)
        },1000)

        // toRaw
        const objDemo = {
            name: 'lcc',
            info: {
                age: 24,
                hobby: 'basketball'
            }
        } ;
        const reactiveDemo = reactive(objDemo) ;
        const readonlyDemo = readonly(objDemo) ;
        // console.log( reactiveDemo === objDemo ) ; // false
        // console.log( readonlyDemo === objDemo ) ; // false
        // console.log( toRaw(reactiveDemo) === objDemo ) ; // true
        // console.log( toRaw(readonlyDemo) === objDemo ) ; // true

        return {
            refNum,shallowReactiveObj,shallowReadonlyObj,baseObj,shallowRefObj
        }
    }
}
</script>

<style>
</style>