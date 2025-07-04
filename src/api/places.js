import axios from "./api";

export const getPlace = (uid) => axios.get(`/places/${uid}/`);
export const listPlaces = (parent_uid) =>
  axios.get(
    `/places/?parent_uid__eq=${parent_uid === null ? "null" : parent_uid}`,
  );
export const createPlace = (data) => axios.post("/places/", data);
export const updatePlace = (uid, data) => axios.post(`/places/${uid}/`, data);
export const deletePlace = (uid) => axios.delete(`/places/${uid}/`);
