// Configuration PM2 — serveur statique local pour le développement.
// Le site ANSER est un site statique (HTML / CSS / JavaScript) : aucun
// processus serveur n'est nécessaire en production.
module.exports = {
  apps: [
    {
      name: 'anser-site',
      script: 'python3',
      args: '-m http.server 3000 --bind 0.0.0.0',
      cwd: '/home/user/webapp',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'development'
      }
    }
  ]
}
