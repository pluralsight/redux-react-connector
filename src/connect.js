import React from 'react'

export default function createStore(redux) {
  const { subscribe, getState } = redux

  return function connectToStore(...storeNames) {
    return function decorateSource(DecoratedComponent) {
      return class ConnectedComponent extends React.Component {
        constructor(props, context) {
          super(props, context)
          this.state = this.reduceStoreState()
        }
        componentDidMount() {
          this.unsubscribe = subscribe(this.onStoreStateChange.bind(this))
        }
        componentWillUnmount() {
          this.unsubscribe()
        }
        reduceStoreState() {
          return storeNames.reduce((allStoresState, storeName) => {
              const storeState = getState()[storeName]
              return {
                ...allStoresState,
              [storeName]: storeState
            }
          }, {})
        }
        onStoreStateChange() {
          this.setState(this.reduceStoreState())
        }
        render() {
          return <DecoratedComponent ref="wrapped" {...this.props} {...this.state}/>
        }
      }
    }
  }
}
