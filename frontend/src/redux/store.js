import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { persistStore,persistReducer } from "redux-persist"
// persistReducer
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"
import rootReducer from "./root-reducer"

// const initialState = {}

const middleware = [thunk]

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// )

// export const persistor = persistStore(store)

// export default store

// export default () => {
  let store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(...middleware)))
  let persistor = persistStore(store)
  // return { store, persistor }
// }
export default {store,persistor}
// export default store
