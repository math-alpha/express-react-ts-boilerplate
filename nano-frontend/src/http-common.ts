import axios from "axios";

const baseURL = "http://localhost:4001/transaction";

export default axios.create({
    baseURL,
    headers: {
        "Content-type": "application/json",
    },
});
