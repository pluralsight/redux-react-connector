export default function toStores(...storeNames) {
  return state => {
    return storeNames.reduce((allStoresState, storeName) => {
      return {
        ...allStoresState,
        [storeName]: state[storeName]
      }
    }, {})
  }
}
