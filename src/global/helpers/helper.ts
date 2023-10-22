import { BACKEND_URL } from "../../config/api";

window.getUrl  = (url: string) => {
    return BACKEND_URL + url;
}