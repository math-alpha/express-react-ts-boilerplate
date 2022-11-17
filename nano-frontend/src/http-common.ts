import axios from "axios";

const baseURL = "http://78.46.11.9:8886/transaction";

export default axios.create({
    baseURL,
    headers: {
        "Content-type": "application/json",
    },
});
