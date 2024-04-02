// apis/baseUrl.tsx
import axios from 'axios';


export const backURL = 'http://localhost:5000/';

export default axios.create({
  baseURL: "http://localhost:3000/"
});