import { useAuthStore } from '../stores';

export function hasPermission(action: string, resource: string) {
  const store = useAuthStore();
  if (!action && !resource) {
    return true;
  }
  const currentUser = store.currentUser;

  const acceptedPermission = currentUser.permissions.some(
    (permission: any) =>
      permission.action.toLowerCase() === action.toLowerCase() &&
      permission.resource.toLowerCase() === resource.toLowerCase()
  );

  return acceptedPermission;
}

export function hasPermissions(actions: string[], resource: string) {
  const store = useAuthStore();
  if (!actions && !resource) {
    return true;
  }

  const currentUser = store.currentUser;

  const acceptedPermission = currentUser.permissions.some((permission: any) => {
    if (permission.resource.toLowerCase() === resource.toLowerCase()) {
      return actions
        .map((action) => action.toLowerCase())
        .includes(permission.action.toLowerCase());
    }
    return false;
  });

  return acceptedPermission;
}

export const permissionPlugin = {
  install(app: any) {
    app.config.globalProperties.$hasPermissions = hasPermissions;
    app.config.globalProperties.$hasPermission = hasPermission;
  }
};
