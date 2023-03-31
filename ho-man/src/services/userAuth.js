
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const  UserAuthApi = createApi({
  reducerPath: 'UserAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  endpoints: (builder) => ({
    
        registerUser: builder.mutation({
            query:(user)=>{
                return {
                    url:'register/',
                    method:'POST',
                    body: user,
                    headers:{
                        'Content-type':'application/json',
                    }
                }
            }
        }),
        loginUser: builder.mutation({
            query:(user)=>{
                return {
                    url:'login/',
                    method:'POST',
                    body: user,
                    headers:{
                        'Content-type':'application/json',
                    }
                }
            }
        }),
        getLoggedUser: builder.query({
            query:(access_token)=>{
                return {
                    url:'profile/',
                    method:'GET',
                    headers:{
                        'authorization':`Bearer ${access_token}`
                    }
                }
            }
        })
    }),
  })


export const { useRegisterUserMutation,useLoginUserMutation,useGetLoggedUserQuery} = UserAuthApi