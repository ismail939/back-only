import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "./authSlice";


const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    prepareHeaders: (headers, {getState}) =>{
        const token = getState().auth.token;
        if(token){
            headers.set("authorization" , `Bearer ${token}`)
        }
        return headers;
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) =>{
    let result = await baseQuery(args, api, extraOptions)
    console.log(result)
    if (result?.error?.status === 401) {
        console.log(result?.error)
        // console.log('Sending refresh token')
        // Send refresh token to get new access token
        // const refreshResult = await baseQuery('/refresh' , api, extraOptions)
        // console.log(refreshResult)
        // if(refreshResult?.data){
        //     const user = api.getState().auth.username
        //     api.dispatch(setCredentials({...refreshResult , user}))
        //     result = await baseQuery(args, api, extraOptions)
        // }else{
        //     api.dispatch(logOut())
        // }
        api.dispatch(logOut())
    }
    return result
}

export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery : baseQueryWithReauth,
    endpoints: builder => ({
        updateClient: builder.mutation({
            query: credentials =>({
                url: `/${credentials.usertype}s/${credentials.id}`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: credentials.credentials
            })
        }),
        updatePhoto: builder.mutation({
            query: credentials =>({
                url: `/${credentials.usertype}s/updatePhoto/${credentials.id}`,
                method: 'PATCH',
                body: credentials.credentials
            })
        })
    })
})

export const {useUpdateClientMutation , useUpdatePhotoMutation} = apiSlice;