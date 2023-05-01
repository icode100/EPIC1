
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
        passwordChange: builder.mutation({
            query:({actualData,access_token})=>{
                console.log(actualData)
                console.log(access_token)
                return {
                    url:'changepassword/',
                    method:'POST',
                    body: actualData,
                    headers:{
                        'authorization':`Bearer ${access_token}`
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
        }),
        postLocalOutingForm: builder.mutation({
            query:({actualData,access_token})=>{
                console.log(actualData)
                console.log(access_token)
                return {
                    url:'localouting',
                    method:'POST',
                    body: actualData,
                    headers:{
                        'authorization':`Bearer ${access_token}`
                    }
                }
            }
        }),
        postNonLocalOutingForm: builder.mutation({
            query:({actualData,access_token})=>{
                console.log(actualData)
                console.log(access_token)
                return {
                    url:'nonlocalouting',
                    method:'POST',
                    body: actualData,
                    headers:{
                        'authorization':`Bearer ${access_token}`
                    }
                }
            }
        })
    }),
  })


export const { useRegisterUserMutation,useLoginUserMutation,useGetLoggedUserQuery,usePasswordChangeMutation,usePostLocalOutingFormMutation,usePostNonLocalOutingFormMutation} = UserAuthApi