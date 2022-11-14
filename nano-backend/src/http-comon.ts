import axios from "axios";

import Config from "./constants";

const baseURL = `${Config.serverURL}/transaction`;

export default axios.create({
    baseURL,
    headers: {
        "Content-type": "application/json",
    },
});