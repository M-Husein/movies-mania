import axios from 'axios';

const APIKEY = "apikey=a9ec872b";

export const API_URL = "https://www.omdbapi.com/?" + APIKEY; //  + "&type=movie"

export const getLists = (params, cancelToken) => axios.get(API_URL, { params, cancelToken });

export const getDetail = (params, cancelToken) => axios.get(API_URL, { params, cancelToken });

export const srcImg = id => "https://img.omdbapi.com/?" + APIKEY + "&i=" + id;

