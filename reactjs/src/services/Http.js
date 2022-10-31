import axios from "axios";
import { BASE_API } from "../shared/constants/app";

const Http = axios.create({
    //     baseURL : "https://jsonplaceholder.typicode.com"
    baseURL: BASE_API,
});
export default Http