const API_BASE = "/api";
const BASE_URL = process.env.BASE_URL;
const APIserve = BASE_URL + API_BASE;

const serviceMaps = {
    badge : "/badge",
    token : "/token",
    user : "/user"
};

export { APIserve, serviceMaps };
