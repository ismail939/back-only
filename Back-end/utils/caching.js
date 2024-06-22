const redis = require('redis')
const client = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    },
    password: process.env.REDIS_PASSWORD
  });

  client.connect().catch(console.error);

  client.on('connect', () => {
    console.log('Connected to Redis...');
  });
  
  client.on('error', (err) => {
    console.log('Redis error: ', err);
  });

  async function setJsonObject(key, jsonObject){
    await client.set(key, JSON.stringify(jsonObject))
  }
  
  async function getJsonObject(key){
    return JSON.parse(await client.get(key))
  }
  // Function to push a JSON object to the list
  async function pushJsonToList(key, jsonObject) {
    await client.rPush(key, JSON.stringify(jsonObject));
  }
  
  async function removeJson(key, listKey, homeListKey){
      await client.del(listKey)
      await client.del(key)
      await client.del(homeListKey)
  }
  // Function to get all JSON objects from the list
  async function getJsonList(key) {
    const values = await client.lRange(key, 0, -1);
    const jsonObjects = values.map(value => JSON.parse(value));
    return jsonObjects;
  }
  async function setKeyTTL(key, ttlInSeconds) {
    await client.expire(key, ttlInSeconds);
  }
  
module.exports = {pushJsonToList, getJsonList, setKeyTTL, setJsonObject, getJsonObject, removeJson}