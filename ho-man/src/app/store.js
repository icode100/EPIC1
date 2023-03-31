import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { UserAuthApi } from '../services/userAuth'
import authReducer from '../features/authSlice'
export const store = configureStore({
  reducer: {
    [UserAuthApi.reducerPath]: UserAuthApi.reducer,
    auth:authReducer
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserAuthApi.middleware),
})


setupListeners(store.dispatch)