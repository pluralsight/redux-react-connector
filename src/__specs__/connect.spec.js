import React from 'react/addons'
import { createRedux } from 'redux'

import createStores from '../connect'

const { TestUtils } = React.addons

describe('connect', () => {

  const initialState = {
    users: {
      users: [],
      count: 0
    },
    plans: {
      plans: [{ id: 'abc123' }]
    }
  }
  const stores = {
    users: () => initialState.users,
    plans: () => initialState.plans
  }

  const redux = createRedux(stores)
  const connectToStores = createStores(redux)

  it('adds key for store in props', () => {
    const storeName = Object.keys(stores)[0]
    @connectToStores(storeName)
    class TestComp extends React.Component {
      render() { return <div>Test Comp</div> }
    }
    const comp = TestUtils.renderIntoDocument(<TestComp />)
    comp.refs.wrapped.props.should.have.property(storeName)
  })

  it('keys per store in props', () => {
    const storeNames = Object.keys(stores).sort()
    @connectToStores(...storeNames)
    class TestComp extends React.Component {
      render() { return <div>Test Comp</div> }
    }
    const comp = TestUtils.renderIntoDocument(<TestComp />)
    Object.keys(comp.refs.wrapped.props).sort().should.eql(storeNames)
  })

  it('transfers all state from the store as props', () => {
    const storeName = 'plans'
    @connectToStores(storeName)
    class TestComp extends React.Component {
      render() { return <div>Test Comp</div> }
    }
    const comp = TestUtils.renderIntoDocument(<TestComp />)
    Object.keys(stores).forEach(storeName => {
      comp.refs.wrapped.props[storeName]
    })
    comp.refs.wrapped.props[storeName].should.eql(initialState[storeName])
  })

})