import axios from "axios";

// create axios instance
export default axios.create({
    baseURL: "http://localhost:3005/api/v1/"
});