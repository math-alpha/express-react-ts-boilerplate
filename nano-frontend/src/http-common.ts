import axios from "axios";

const baseURL = "http://backend:8887/transaction";

export default axios.create({
    baseURL,
    headers: {
        "Content-type": "application/json",
    },
});
