import logo from '../assets/logo-hd.png';
import './fallback.css';
const Fallback = () => {
  return (
    <>
      <div className="flex justify-center items-center w-[100vw] h-[100vh]">
          <div className="">
            <img src={logo} alt="" className='w-52 fallback' />
          </div>
      </div>
    </>
  )
};

export default Fallback;
