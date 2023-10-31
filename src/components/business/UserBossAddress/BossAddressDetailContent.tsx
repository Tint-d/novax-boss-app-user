import React from 'react'

const BossAddressDetailContent = ({
    title ,content
}: { title : string, content : string}) => {
  return (
    <div className="content flex flex-col gap-3">
    <h3 className="text-[#A8B3CF] text-md  underline">{title}</h3>
        <p  className='text-white text-[.8em] ps-4'>{content}</p>
</div>
  )
}

export default BossAddressDetailContent