interface BusinessPhoto {

  id: number,
  business_photo: string
  boss_address_id: string

}
interface BusinessPhotosProps {
  photos: BusinessPhoto[],
  logo : string,
  cover : string
}

const BusinessPhotos = ({ photos,logo,cover }: BusinessPhotosProps) => {

  if(photos && photos.length == 0 )
  {
    photos = [
      { id: 0, business_photo: logo, boss_address_id: '' },
      { id: 1, business_photo: cover, boss_address_id: '' },
      { id: 2, business_photo: logo, boss_address_id: '' },
      { id: 3, business_photo: cover, boss_address_id: '' },
    ];

  }
  return (
    <div className="grid grid-cols-2 place-content-between  w-full gap-4 mt-16 px-4">
      {
        photos.length > 0 && (
          photos.map((image, index) => (
            <div key={image.id}>
              <label htmlFor={`modal-${index}`} className="">
                <img src={image.business_photo} alt="" className="w-[200px] h-[140px] object-cover rounded-lg" />
              </label>
              <input type="checkbox" id={`modal-${index}`} className="modal-toggle" />
              <div className="modal">
                <div className="modal-box flex justify-center">
                  <img src={image.business_photo} alt="" className="w-[90%] h-[full] object-contain rounded-lg" />
                </div>
                <label className="modal-backdrop" htmlFor={`modal-${index}`}>Close</label>
              </div>
            </div>

          ))
        )
      }
    </div >
  )
}

export default BusinessPhotos