import React from 'react'

const BossAddressDetailContent = ({
    title ,content
}: { title : string, content : string}) => {
  return (
    <div className="content flex flex-col gap-3 ">
    <h3 className="text-[#A8B3CF] text-md  md:text-[1.3em] ">{title}</h3>
        <p style={{ wordBreak: "break-word" }}  className='text-white text-md md:text-[1.3em] whitespace-pre-line ps-4 leading-6'>{content}</p>
</div>
  )
}

export default BossAddressDetailContent