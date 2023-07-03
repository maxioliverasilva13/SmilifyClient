import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiRoutes from "../../utils/apiRoutes";
import { prepareHeaders } from "../../utils/prepareHeaders";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/Smilify-1.0/resources",
  prepareHeaders,
});
  
export const UserService = createApi({
  reducerPath: "UserService",
  baseQuery: baseQuery,
  tagTypes: ["UserInfo"],
  endpoints: builder => ({
    signIn: builder.mutation({
      query: data => {
        return {
          url: apiRoutes.signIn(),
          method: "POST",
          body: { email: data?.email, password: data?.password },
        };
      },
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),
    currentUser: builder.query({
      query: () => apiRoutes.currentUser(),
      providesTags: ["UserInfo"],
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),
    editMeInfo: builder.mutation({
      query: data => {
        return {
          url: apiRoutes.editMeInfo(),
          method: "PUT", 
          body: { ...data},
        };
      },
      invalidatesTags: ["UserInfo"],
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),
    estadisticas: builder.query({
      query: apiRoutes.estadisticas,
      transformResponse(value:any) {
        const response = value;
        return response;
      },
    }),

    editConfig : builder.mutation({
      query: configData => {
        return {
          url: apiRoutes.editConfiguracion(configData.id),
          method: "PUT",    
          body: { PrecioPorOrden : configData.precioPorOrden},
        };
      },
      transformResponse(value) {
        const response = value;
        return response;
      },
    })
  }),
});

export const {
  useSignInMutation,
  useCurrentUserQuery,
  useEditMeInfoMutation,
  useEditConfigMutation,
  useEstadisticasQuery
} = UserService;
