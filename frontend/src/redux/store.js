import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
// import { persistStore } from "redux-persist"
// persistReducer
// import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"
import rootReducer from "./root-reducer"

const initialState = {}

const middleware = [thunk]

// const persistConfig = {
//   key: "root",
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

// export const persistor = persistStore(store)

export default store

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }

// export default store
