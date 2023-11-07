import { BACKEND_URL } from "../../config/api";

window.getUrl  = (url?: string) => {
   if(url) {
      return BACKEND_URL + url;
   }
   return BACKEND_URL;
}

async function convertImageUrlToBase64(url: string): Promise<string | null> {
   try {
     const response = await fetch(url);
     const blob = await response.blob();
     const reader = new FileReader();
 
     return new Promise((resolve, reject) => {
       reader.onload = () => {
         resolve(reader.result as string);
       };
 
       reader.onerror = () => {
         // In case of a FileReader error, return the original URL
         resolve(url);
       };
 
       reader.readAsDataURL(blob);
     });
   } catch (error) {
     console.error('Error converting image to base64:', error);
     return url; // Return the original URL in case of a fetch error
   }
 }
 
 export default convertImageUrlToBase64;
 
 
 
 
 
 