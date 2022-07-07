const app = require('./app');
const watch = require('./events/watch');

const port = process.env.PORT || 3001;


module.exports = 
{
    config:{},
    server:app,
    watcher:watch,
    configFromEnv()
    {
        const dotenv = require('dotenv');
        dotenv.config();
        this.config.port = process.env.PORT || 3000;
        this.config.connection = process.env.MONGODB_URL 
        return this;
        
    },
    start()
    {
        this.server.listen(this.config.port, () => {
          console.log(`MESS (Mongo Event Sourcing) listening at http://localhost:${this.config.port}`);
        });
          this.watcher(process.env.MONGODB_URL).catch(console.dir);
          return this;
    }
};