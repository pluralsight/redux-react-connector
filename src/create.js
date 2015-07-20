import React from 'react'
import { Connector, Provider } from 'react-redux'

export default function createConnector(store) {
  return function connect(select) {
    return function decorateSource(DecoratedComponent) {
      return class ConnectorWrapper extends React.Component {
        render() {
          return (
            <Provider store={store} ref="3">
              {() => (
                <Connector select={select} ref="2">
                  {(props) => <DecoratedComponent {...this.props} {...props} ref="1" />}
                </Connector>
              )}
            </Provider>
          )
        }
      }
    }
  }
}