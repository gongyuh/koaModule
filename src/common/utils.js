import { getValue } from '../config/redisConfig';

const checkCode = async (key, value) => {
  debugger
  const redisData = await getValue(key).then((res)=>res)
  if (redisData != null) {
    if (redisData.toLowerCase() === value.toLowerCase()) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export {
  checkCode
}