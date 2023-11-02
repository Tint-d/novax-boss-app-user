import React from 'react'
import BossAddressDetailContent from './BossAddressDetailContent'
interface SideProps{
    show : number,
    setShow : React.Dispatch<React.SetStateAction<number>>,
    sidesData : {
        title : string,
        content : string
    }[][]
}
const BossAddressSectionOne = ({show,sidesData,setShow} : SideProps) => {

    const sides = (id: number) => {
        return (
            <>
                {
                    sidesData[id].map((side, index) => (
                        <BossAddressDetailContent title={side.title} content={side.content} key={index}/>
                    ))
                }
            </>
        )
    }
  return (
    <div className="flex flex-col md:ps-14 mt-4  gap-4 ">
         {sides(show)}
    </div>
  )
}

export default BossAddressSectionOne