module.exports = {
    apps: [
      {
        name: 'front',
        exec_mode: 'cluster',
        instances: '1', // Or a number of instances
        script: 'yarn',
        args: 'start',
        autorestart: true,
        max_memory_restart: '14G',
        env: {
          NODE_ENV: 'production',
          PORT: '3000'
        }
      }
    ],
  deploy : {
      production : {
         "user" : "www-data",
         "host" : ["10.10.0.19"],
         "ref"  : "origin/develop",
         "repo" : "git@git.dc-vbz.ru:mnikulin/vb-market-frontend.git",
         "path" : "/srv/front",
         "post-deploy" : "npm install && yarn && yarn build && pm2 reload ecosystem.config.js --env production && pm2 save"
      }
    }
  };