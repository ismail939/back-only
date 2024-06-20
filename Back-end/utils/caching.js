const redis = require('redis')
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
  
  // Function to get all JSON objects from the list
  async function getJsonList(key) {
    const values = await client.lRange(key, 0, -1);
    const jsonObjects = values.map(value => JSON.parse(value));
    return jsonObjects;
  }
  async function setKeyTTL(key, ttlInSeconds) {
    await client.expire(key, ttlInSeconds);
  }
  
module.exports = {pushJsonToList, getJsonList, setKeyTTL, setJsonObject, getJsonObject}