export {};

declare module 'vue' {
  interface ComponentCustomProperties {
    $hasPermissions: (actions: string[], resources: string) => boolean;
    $hasPermission: (action: string, resource: string) => boolean;
  }
}
