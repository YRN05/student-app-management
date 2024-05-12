import axios from "axios";

export const baseApi = axios.create({
    baseURL: "https://659a3991652b843dea535c94.mockapi.io/api/v1/"
})