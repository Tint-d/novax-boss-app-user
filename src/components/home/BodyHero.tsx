import React from 'react'

interface BodyHeroProps {
    title: string,
    content: string,
    mmContent: string,
    image: string,
    lng: string,
    reverse: boolean
    flexRowReverse?: boolean,
    imageClass?: string
    imageContainerClass?: string,
    formatList ?: boolean
}

const BodyHero = ({
    title,
    content,
    mmContent,
    image,
    lng,
    reverse,
    imageClass,
    flexRowReverse = false,
    imageContainerClass,
    formatList = false

}: BodyHeroProps) => {


    const order = reverse ? "flex-col-reverse" : "flex-col"
    const flexRow = flexRowReverse ? "md:flex-row-reverse" : "md:flex-row"

    const displayedContent = lng == 'en' ? content : mmContent;

    const listItems = displayedContent.split('\n').map((item, index) => (
        <li key={index}>{item.trim()}</li>
      ));
    return (
        <>
            <div className={`flex justify-between ${order}  ${flexRow} h-full items-center px-4 mt-12 gap-y-10`}>
                <div className="md:w-6/12  w-12/12">
                    <div className="flex justify-start items-center mb-3">
                        <h4 className="text-[#DCA715] text-3xl md:text-5xl font-bold">
                            <p>{title}</p>
                        </h4>
                    </div>
                    <p className=" text-white leading-8  ">
                        {
                            formatList ? <ul className="list-none list-inside">{listItems}</ul> : displayedContent
                        }
                    </p>

                </div>
                <div className={`w-12/12 flex items-center  ${imageContainerClass}`}>
                    <img
                        src={image}
                        alt=""
                        className={`w-12/12 h-full object-cover ${imageClass} md:w-4/12 `}
                    />
                </div>
            </div>
        </>
    )
}

export default BodyHero