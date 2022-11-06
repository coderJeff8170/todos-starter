import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      //name here will be used in export
      tags: ["Todos"],
      query: () => "/todos",
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ["Todos"],
    }),
    getSingleTodo: builder.mutation({
        tags: ["Todo"],
        query: (id) => ({
            url: `/todos/${id}`,
            method: "GET",
            // body: id,
          }),
        providesTags: ["Todo"],
      }),
    getTodoSubtask: builder.query({
        tags: ["TodoSubtask"],
        // query: (subTask) => ({
            query: () => ({
            // url: `/todos/${subTask.todoId}/${subTask.subTaskNo}`,
            url: `/todos/10`,
            method: "GET",
            // body: subTask
        }),
        providesTags: ["TodoSubtask"],
      }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetSingleTodoMutation,
  useGetTodoSubtaskQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice; //the name here is built from the name of the query in the builder => use + getTodos + Query
