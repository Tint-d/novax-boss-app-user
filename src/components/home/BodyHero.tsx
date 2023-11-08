import React from 'react'

interface BodyHeroProps {
    title: string,
    content: string,
    mmContent: string,
    image: string,
    lng: string,
    container?: string
    imageClass?: string
    imageContainerClass?: string,
    boxContainerClass?: string,
    formatList ?: boolean,
    textClass?: string
}

const BodyHero = ({
    title,
    content,
    mmContent,
    image,
    lng,
    container,
    imageClass,
    imageContainerClass,
    boxContainerClass,
    formatList = false,
    textClass,
}: BodyHeroProps) => {

    // const flexRow = flexRowReverse ? "md:flex-row-reverse" : "md:flex-row"

    const displayedContent = lng == 'en' ? content : mmContent;

    const listItems = displayedContent.split('\n').map((item, index) => (
        <li key={index}>{item.trim()}</li>
      ));
    return (
        <>
            <div className={`flex ${container}  h-full  px-4 mt-12 gap-y-10`}>
                <div className={`${boxContainerClass} w-12/12`}>
                    <div className="flex justify-start items-center mb-3">
                        <h4 className={`text-[#DCA715] font-bold ${textClass}`}>
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
                        className={`w-12/12 h-full object-contain ${imageClass} md:w-4/12 `}
                    />
                </div>
            </div>
        </>
    )
}

export default BodyHero