import { apiSlice } from "../apiSlice";

const ADMIN_URL = '/api/admin'

export const adminApiSlice = apiSlice.injectEndpoints({

    endpoints : (builder) => ({
        
        adminLogin : builder.mutation({
            query : (data) => ({
                url : `${ADMIN_URL}`,
                method : 'POST',
                body : data
            })
        }),

        adminLogout : builder.mutation({
            query : (data) => ({
                url : `${ADMIN_URL}/logout`,
                method : 'POST'
            })
        }),

        getUsers : builder.mutation({
            query : (data) => ({
                url : `${ADMIN_URL}/users`,
                method : 'GET'
            })
        })

    })

})

export const { useAdminLoginMutation , useAdminLogoutMutation, useGetUsersMutation } = adminApiSlice