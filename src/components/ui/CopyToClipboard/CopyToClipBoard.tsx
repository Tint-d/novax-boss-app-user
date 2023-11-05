import {  useCallback,  } from "react";
import { TbClipboardCopy } from "react-icons/tb";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

interface CopyToClipBoardProps {
    url : string
}

const CopyToClipBoard = ({url} : CopyToClipBoardProps) => {

    const copyToClipBoard = useCallback(
        () => {
            copy(window.location.host + url);
            toast.success("Copied",{
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 600,
            });
          },
        [url]
    )

  return (
    <TbClipboardCopy
    onClick={()=>copyToClipBoard()}
     className=" w-[45px] h-[45px] p-2   shadow-black/40 text-white bg-[#5b626d] hover:bg-[#4c5158] transition-all rounded-full" />
  )
}

export default CopyToClipBoard