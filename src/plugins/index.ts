/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import router from '../router';
import { permissionPlugin } from './permissions';
import { pinia } from './pinia';

// CSS Framework
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// Types
import type { App } from 'vue';

export function registerPlugins(app: App) {
  app.use(Antd).use(pinia).use(permissionPlugin).use(router);
}
