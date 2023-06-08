import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiRoutes from "../../utils/apiRoutes";
import { prepareHeaders } from "../../utils/prepareHeaders";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/Smilify-1.0/resources",
  prepareHeaders,
});

export const DienteService = createApi({
  reducerPath: "DienteService",
  baseQuery: baseQuery,
  tagTypes: ["DienteInfo", "AllDientesInfo"],
  endpoints: (builder) => ({
    createDienteInfo: builder.mutation({
      query: (data) => {
        return {
          url: apiRoutes.createDienteInfo(),
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["DienteInfo"],
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),
    getInfoDiente: builder.mutation({
      query: (data) => {
        return {
          url: apiRoutes.getInfoDiente(),
          method: "POST",
          body: data,
        };
      },
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),
  }),
});

export const { useCreateDienteInfoMutation, useGetInfoDienteMutation } =
  DienteService;
