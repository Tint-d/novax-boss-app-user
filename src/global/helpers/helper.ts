import { BACKEND_URL } from "../../config/api";

window.getUrl  = (url?: string) => {
   if(url) {
      return BACKEND_URL + url;
   }
   return BACKEND_URL;
}  