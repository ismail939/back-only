const redis = require('redis')
// const client = redis.createClient({
//     socket: {
//       host: 'redis-10817.c241.us-east-1-4.ec2.redns.redis-cloud.com',
//       port: 10817,
//       password: '03A29KHtB2oIYYuAogjaDOe2ggLuH4vU'
//     },
//   });
const client = redis.createClient({

  socket: {
    host: '127.0.0.1',
    port: 6379,
  },
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