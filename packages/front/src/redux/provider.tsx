import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './store'
import React from 'react'

function ReduxProviders({ children }: { children: any }) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} > */}
        {children}
      {/* </PersistGate> */}
    </Provider>
  )
}

export default ReduxProviders
