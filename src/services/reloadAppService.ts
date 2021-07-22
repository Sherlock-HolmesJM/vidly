let obj: any = { app: {}, property: "" };

export function setAppRef(app, property: string) {
  obj = { app, property };
}

export function reloadApp() {
  obj.app[obj.property]();
}
