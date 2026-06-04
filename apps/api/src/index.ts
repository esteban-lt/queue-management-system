import { Server } from './server';
import { Routes } from './routes';

(() => {
  main();
})();

function main() {
  new Server({
    port: 3000,
    routes: Routes.routes,
  }).start();
}
