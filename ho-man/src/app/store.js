import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { UserAuthApi } from '../services/userAuth'
import authReducer from '../features/authSlice'
import outdateReducer from '../features/outdateSlice'
export const store = configureStore({
  reducer: {
    [UserAuthApi.reducerPath]: UserAuthApi.reducer,
    auth:authReducer,
    date:outdateReducer
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserAuthApi.middleware),
})


setupListeners(store.dispatch)