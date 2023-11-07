import { t } from 'i18next';
import React from 'react'
import { RiLogoutCircleLine } from 'react-icons/ri'

interface Props {
    open : () => void;
}
const Logout = ({
    open 
} : Props) => {
  return (
    <button
    onClick={open}
    className=" flex justify-start gap-2  px-3 items-center text-[#A8B3CF] hover:text-white hover:bg-black duration-[0.5s] rounded py-3  w-full"
  >
    <RiLogoutCircleLine className="text-[26px] " />
    <h2 className="text-[14px] pt-1">{t('Log out')}</h2>
  </button>
  )
}

export default Logout