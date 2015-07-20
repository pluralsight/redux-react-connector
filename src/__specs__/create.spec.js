import React from 'react/addons'
import { combineReducers, createStore } from 'redux'

import createConnector from '../create'
import toStores from '../to-stores'

const { TestUtils } = React.addons

function wrappedComponentProps(comp) {
  return comp.refs[3].refs[2].refs[1].props // contact!
}

describe('create', () => {

  const initialState = {
    users: {
      users: [],
      count: 0
    },
    plans: {
      plans: [{ id: 'abc123' }]
    }
  }
  const reducers = {
    users: () => initialState.users,
    plans: () => initialState.plans
  }

  const store = createStore(combineReducers(reducers))
  const connect = createConnector(store)

  it('lets existing props flow through', () => {
    const reducerName = Object.keys(reducers)[0]
    @connect(toStores(reducerName))
    class TestComp extends React.Component {
      render() { return <div>Test Comp</div> }
    }
    const comp = TestUtils.renderIntoDocument(<TestComp existing="thing" />)
    wrappedComponentProps(comp).should.have.property('existing')
  })

  it('adds key for store in props', () => {
    const reducerName = Object.keys(reducers)[0]
    @connect(toStores(reducerName))
    class TestComp extends React.Component {
      render() { return <div>Test Comp</div> }
    }
    const comp = TestUtils.renderIntoDocument(<TestComp />)
    wrappedComponentProps(comp).should.have.property(reducerName)
  })

  it('keys per store in props', () => {
    const reducerNames = Object.keys(reducers)
    @connect(toStores(...reducerNames))
    class TestComp extends React.Component {
      render() { return <div>Test Comp</div> }
    }
    const comp = TestUtils.renderIntoDocument(<TestComp />)
    reducerNames.forEach(reducerName => {
      wrappedComponentProps(comp).should.have.property(reducerName)
    })
  })

  it('transfers all state from the store as props', () => {
    const reducerName = 'plans'
    @connect(toStores(reducerName))
    class TestComp extends React.Component {
      render() { return <div>Test Comp</div> }
    }
    const comp = TestUtils.renderIntoDocument(<TestComp />)
    wrappedComponentProps(comp)[reducerName].should.eql(initialState[reducerName])
  })

})