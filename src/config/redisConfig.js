import { appendFileSync } from 'fs';
import redis from 'redis'

const options = {
    host:'127.0.0.1',
    port:6379,
    detect_buffer:true,
    retry_strategy: function(options) {
        if (options.error && options.error.code === "ECONNREFUSED") {
          // End reconnecting on a specific error and flush all commands with
          // a individual error
          return new Error("The server refused the connection");
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          // End reconnecting after a specific timeout and flush all commands
          // with a individual error
          return new Error("Retry time exhausted");
        }
        if (options.attempt > 10) {
          // End reconnecting with built in error
          return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
      },
}

//client
const client = redis.createClient(options)

//setVal
const setValue = (key, value, time) => {
  if (typeof value === 'undefined' || value == null || value === '') {
    return
  }
  if (typeof value === 'string') {
    if (typeof time !== 'undefined') {
      client.set(key, value, 'EX', time)
    } else {
      client.set(key, value)
    }
  } else if (typeof value === 'object') {
    // { key1: value1, key2: value2}
    // Object.keys(value) => [key1, key2]
    Object.keys(value).forEach((item) => {
      client.hset(key, item, value[item], redis.print)
    })
  }
}

//getVal
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);
const getValue = (key) => {
   return getAsync(key)
}

const getHValue = (key) => {
  return promisify(client.hgetall).bind(client)(key)
}



export {
    client,
    setValue,
    getValue,
    getHValue
}