## Deprecated

Use `react-redux#connect` instead.  This repo will be deleted soon.

#redux-react-connector

Connector implementation meant for use with the [redux](https://github.com/gaearon/redux) [flux](https://facebook.github.io/flux/docs/overview.html) implementation.

## Why

#### Already provided from `react-redux#Connector`

- Encapsulates all store listening and state in one higher-order Component
- Pass all store state as props to your Components

#### `redux-react-connect` additionally provides

- Convenient `toStores` select function for easy listenin' to multiple stores by name
- Gets all data from specified stores without additional configuration
- Invisible `Provider` wrapping of Components

## Install

```
npm install redux-react-connect --save-dev
```

## Usage

As usual, initializing Redux is required.  Your `./store.js` might look like this:

```
import { createStore, combineReducers } from 'redux'
import * as reducers from './my-reducer-index'

export default createStore(combineReducers(reducers))
```

Now you need to initialize your connector.  Your `./connect.js` might look like this:

```
import store from './store'
import { createConnector, toStores } from 'redux-react-connector'

export default createConnector(store)
```

Now you're all ready to connect your stores' data to components:

```
import { toStores } from 'redux-react-connector'
import connectToStores from './connect'

@connect(toStores('myReducer'))
class MyComponent extends React.Component {
  render() {
    return (
      <div>{this.props.myReducer.reducerProperty}</div>
    )
  }
}
```

Using the decorator wraps the Component in a higher-order Component that takes care of store state listening.  It will pass the props from the store into your Component as `props`.

(Note that to use decorators, you'll need something like [babel on stage 1](https://babeljs.io/docs/usage/experimental/).

In the example above, `myReducer` is the name of your reducer, and on that object all the store's state for that reducer will be available, as shown with `reducerProperty` above.

To listen to multiple stores, pass, for instance, 'myOtherReducerName' to the decorator.  Note that these names match those that you exported in your `./my-reducer-index.js` file and with which you initialized Redux.

## Custom Selector

If you'd rather creator your own select function instead of using the convenient `toStores` function, that's still possible:

```
import connectToStores from './connect'

@connect(state => { myReducer: state.myReducer })
class MyComponent extends React.Component {
  render() {
    return (
      <div>{this.props.myReducer.reducerProperty}</div>
    )
  }
}
```
