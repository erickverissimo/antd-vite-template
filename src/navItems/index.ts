/* eslint-disable no-else-return */
const initialRoute = {
  0: "users",
  1: "users",
  2: "users",
};

export function getInitialRoute(user: any): string {
  if (user !== undefined && user !== null && user !== "") {
    if (user.roles && user.roles.length) {
      const roles = user.roles.map((element: string) => element.toLowerCase());
      if (roles.includes("admin")) {
        return initialRoute[0];
      } else if (roles.includes("tecnico")) {
        return initialRoute[1];
      } else if (roles.includes("comercial")) {
        return initialRoute[1];
      }
      return initialRoute[0];
    }
  }
  return "";
}
