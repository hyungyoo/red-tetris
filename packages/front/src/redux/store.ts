import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import joinSlice from './reducers/joinSlice'
import roomListSlice from './reducers/roomListSlice'
import roomSlice from './reducers/roomSlice'

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  join: joinSlice,
  roomList: roomListSlice,
  room: roomSlice
})

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: rootReducer,
  // middleware: [thunkMiddleware]
})

// export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch<any>
export type GetState = () => RootState
