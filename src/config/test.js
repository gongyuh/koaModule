import { getValue, setValue, getHValue } from './redisConfig'

setValue('name1','name message from redisConfig')

getValue('name1').then((res)=>{
    console.log(res)
})

setValue('nameObj',{name:'gongyu',age:21,email:'gongyu@qq.com'})

getHValue('nameObj').then((res)=>{
    console.log('obj:' + res)
})