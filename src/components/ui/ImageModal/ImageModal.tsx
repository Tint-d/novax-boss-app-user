import React, { useEffect, useState } from 'react'

const ImageModal = ({url,modal}: {url: string,modal : string}) => {
    const [base64Image, setBase64Image] = useState<string>(url);

    useEffect(()=>{

        const convertImageUrlToBase64 = async (url : string) => {
            try {
              const response = await fetch(url);
              const blob = await response.blob();
              const reader = new FileReader();
      
              reader.onload = () => {
                setBase64Image(reader.result as string);
              };
      
              reader.readAsDataURL(blob);
            } catch (error) {
              console.error('Error converting image to base64:', error);
            }
          };
      
          // Call the function to convert the image URL to base64
          convertImageUrlToBase64(url);
    },[])

    return (
        <div>
             <input type="checkbox" id={modal} className="modal-toggle" />
                <div className="modal">
                  <div className="modal-box flex justify-center !max-w-[900px]">
                    <img src={base64Image} alt="" className=" w-[600px] h-[400px]  object-contain rounded-lg" />
                  </div>
                  <label className="modal-backdrop" htmlFor={modal}>Close</label>
                </div>
              </div>
    )
}

export default ImageModal