import { env } from './shared/plugins/env';
import { Server } from './server';
import { Routes } from './routes';

(() => {
  main();
})();

function main() {
  new Server({
    port: env.port,
    routes: Routes.routes,
  }).start();
}
