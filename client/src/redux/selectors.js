export const getGlobalState = (store) => store;

export const getPageState = (store) => store.page;

export const getLoadingStatus = (store) =>
  getPageState(store) ? getPageState(store).status : {};

export const getDataState = (store) => store.data;

export const getNewsState = (store) =>
  getDataState(store) ? getDataState(store).response : {};
