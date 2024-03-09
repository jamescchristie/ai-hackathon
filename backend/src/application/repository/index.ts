import storeJSON from "./store.json";

const store = storeJSON as Record<string, any>;

export const storeClient = {
  getItem: (key: string) => {
    return store[key];
  },
  addItem: (key: string, data: object): object => {
    store[key] = data;
    persist();
    return data;
  },
  removeItem: (key: string) => {
    delete store[key];
  },
};

const persist = (): void | Error => {
  const FileSystem = require("fs");
  FileSystem.writeFile("store.json", JSON.stringify(store), (error: Error) => {
    if (error) throw error;
  });
};
