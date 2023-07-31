const config = require("../config/");
const redis = require("redis");

class RedisClient {
  async getInstance() {
    try {
      if (!RedisClient.instance) {
        const options = {
          socket: {
            host: config.redis_host,
            port: config.redis_port,
            reconnectStrategy: (retries) => {
              if (retries > 1) {
                return new Error("Redis Client error reconnecting");
              }

              return Math.min(retries * 50, 500);
            },
          },
        };

        if (config?.redis_password) {
          options.password = config.redis_password;
        }

        RedisClient.instance = redis.createClient(options);

        await RedisClient.instance.connect();

        RedisClient.instance.on("error", (err) =>
          console.log("Redis Client Error", err)
        );
        RedisClient.instance.on("ready", () =>
          console.log("Redis Client Ready")
        );
      }

      return RedisClient.instance;
    } catch (e) {
      console.error(e);
    }
  }
}

const instance = new RedisClient();
Object.freeze(instance);

module.exports = instance;
