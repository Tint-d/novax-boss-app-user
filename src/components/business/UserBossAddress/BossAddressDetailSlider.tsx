import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
interface Props {
    state : number,
    setState : React.Dispatch<React.SetStateAction<number>>,
    max ? : number
}

const BossAddressDetailSlider = ({state,setState,max} : Props) => {

    max = max ? max : 3;
  const handleIncrease = () => {
        setState((prev) => {

            if(prev == max)
            {
                return 0;
            }
            return prev + 1;
        });
}

const handleDecrease = () => {
    setState((prev) => {
        if(prev == 0)
        {
            return max !;
        }
        return prev - 1;
    })};

    const jump = (index : number) => {
        setState(index);
    }

  return (
    <div className='flex justify-center items-center gap-4 max-w-[80vw]'>
        <button onClick={handleDecrease} className="flex justify-center text-[.8em] items-center bg-[#DCA715] rounded-full h-[30px] w-[30px]">
            <FaArrowLeft />
        </button>

        {
        // Use Array.map to generate elements based on max
        Array.from({ length: max  + 1 }, (_, index) => (
            <button
                key={index}
                onClick={() => jump(index)}
                className={`flex items-center rounded-full h-[6px] w-[30px] ${state === index ? 'bg-[#DCA715]' : 'bg-[#F2F2F2]'}`}
            >
            </button>
        ))
    }

        <button onClick={handleIncrease} className="flex justify-center text-[.7em] items-center bg-[#DCA715] rounded-full h-[25px] w-[25px]">
            <FaArrowRight />
        </button>
    </div>
  )
}

export default BossAddressDetailSlider ;