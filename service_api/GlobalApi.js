import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getUserResume = (userEmail) =>
  axiosClient.get(`/user-resumes?filters[user_email][$eq]=` + userEmail);

export const updateResumeDetail = (id, data) =>
  axiosClient.put("/user-resumes/" + id, data);

export const getResumeById = (id) =>
  axiosClient.get("/user-resumes/" + id + "?populate=*");
//gives everything from the db

export const createNewResume = (data) =>
  axiosClient.post("/user-resumes", data);
