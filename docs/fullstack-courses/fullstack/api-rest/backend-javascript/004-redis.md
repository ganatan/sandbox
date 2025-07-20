npm install redis

# Creation du client
  - redis.client.js

  import { createClient } from 'redis';

  const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });


# Utilisation
  
  getItems = async (req, res, next) => {
    try {
      const cacheKey = 'persons:all';
      const cached = await redisClient.get(cacheKey);

      if (cached) {
        res.locals.data = JSON.parse(cached);
        res.locals.statusCode = HTTP_STATUS.OK;
        return next();
      }

      const result = await this.service.getItems(req.query);

      await redisClient.set(cacheKey, JSON.stringify(result), { EX: 300 });

      res.locals.data = result;
      res.locals.statusCode = HTTP_STATUS.OK;

      return next();
    } catch (error) {
      return next(error);
    }
  };

# Interface de controle
  redis               http://localhost:6379

  redisinsight	      http://localhost:8001

  Select
      Existing database 
      host    redis
      port    6379
      name    redis_name (pas d'importance)

  Clic 
    redis_name      