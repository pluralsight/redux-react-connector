#redux-react-connector

Connector implementation meant for use with the [redux](https://github.com/gaearon/redux) [flux](https://facebook.github.io/flux/docs/overview.html) implementation.

## Why

#### Already provided from `redux/react#Connector`

- Encapsulates all store listening and state in one higher-order Component
- Pass all store state as props to your Components

#### `redux-react-connect` additionally provides

- Easy listenin' to multiple stores by name
- Gets all data from specified stores without additional configuration
- No `Provider` wrapping of app Component required
- A style that avoids callbacks when connecting your smart components

## Install

```
npm install redux-react-connect --save-dev
```

## Usage

As usual, initializing Redux is required.  `./redux.js` might look like this:

```
import { createRedux } from 'redux'
import * as stores from './my-stores-index'

const redux = createRedux(stores)

export default redux
```

Now you need to initialize your connector.  `./connect-to-stores.js` might look like this:

```
import redux from './redux'
import { createConnector } from 'redux-react-connector'

export default createConnector(redux)
```

Now you're all ready to connect your stores' data to components

```
import connectToStores from './connect-to-stores'

@connectToStores('myStoreName')
class MyComponent extends React.Component {
  render() {
    return (
      <div>{this.props.myStoreName.storeProperty}</div>
    )
  }
}
```

Using the decorator wraps the Component in a higher-order Component that takes care of store state listening.  It will pass the props from the store into your Component as `props`.

(Note that to use decorators, you'll need something like [babel on stage 1](https://babeljs.io/docs/usage/experimental/).

In the example above, `myStoreName` is the name of your store, and on that object all the store's state will be available, as shown with `storeProperty` above.

To listen to multiple stores, pass, for instance, 'myOtherStoreName' to the decorator.  Note that these names match those that you exported in your `./store-index.js` and initialized Redux with.
