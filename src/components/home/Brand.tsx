import { useState } from "react";
import { BiMessageRoundedDots } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
const Brand = () => {
  const [message, setMessage] = useState<boolean>(false);
  return (
    <div className="flex min-h-screen  gap-y-10 container mx-auto px-10 flex-col  items-center">
      <img
        width={200}
        height={200}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRyurWsC_LPj6-Xp9-4885OYTNNSDjDvSFIQ&usqp=CAU"
      />
      <h2 className="text-[20px] text-center tracking-wider text-white">
        Boss Team သည် မြန်မာပြည်မှာရှိသော SME’s များအား စနစ်တကျ လည်ပတ်နိုင်ရန်
        ရောင်းအားတက်ရန် လုပ်ငန်းတိုုးချဲ့နိုင်ရန်အတွက် စာရိတ်အနည်းဆုံး နှင့်
        တည်ဆောက်နိုင်ရေးအတွက် ကူညီပေးနေသည့် အဖွဲ့စည်းဖြစ်ပါသည်။ ကျွန်တော်တို့
        Boss Team မှ အသင်းသူ အသင်းသားများ၏ လုပ်ငန်းများကို တစ်နေရာထဲမှာ
        ဝင်ရောက်လေ့လာနိုင်ရန် ဒီ Website လေးကို တည်ထောင်ဖြစ်တာပါ။ မိမိအတွက်
        လိုအပ်သော လုပ်ငန်းအမျိုးအစားများကို ရွေးချယ််ပြီး လွပ်လပ်စွာ
        ဝင်ရောက်လေ့လာနိုင်ပါတယ်ခင်ဗျာ
      </h2>
      <div className="absolute bottom-[25%] right-20">
        {message && (
          <div className="w-[440px] rounded-md absolute right-0 bottom-[25%]  p-2 flex flex-col justify-center items-center bg-[#262a31]">
            <RxCross2
              onClick={() => setMessage(false)}
              className="text-3xl absolute top-5 right-3 text-[#A8B3CF]"
            />
            <img
              width={70}
              height={70}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRyurWsC_LPj6-Xp9-4885OYTNNSDjDvSFIQ&usqp=CAU"
            />
            <h2 className="text-[16px] py-2 w-[300px] text-center text-[#A8B3CF]">
              သင်မေးလိုသောမေးခွန်းများကို နှိပ်၍ အဖြေများကို ရယူနိုင်ပါသည်။
            </h2>
            <div className="flex justify-around gap-3 flex-wrap items-center">
              <button className="text-[14px] h-[50px] leading-5 text-white w-[200px]  bg-[#383d47] px-3  rounded-[30px]">
                သင်တန်းအကြောင်းပိုမိုသိရှိလိုပါသလား။
              </button>
              <button className="text-[14px] h-[50px] leading-5 text-white w-[200px]  bg-[#383d47] px-3  rounded-[30px]">
                SIR သင်တန်းဖွင့်သေးပါသလား?
              </button>
              <button className="text-[14px] h-[50px] leading-5 text-white w-[200px]  bg-[#383d47] px-3  rounded-[30px]">
                Unloacker 3 သင်တန်းဖွင့်သေးပါသလား?
              </button>
            </div>
            <div className="h-[200px] w-full overflow-y-scroll no-scrollbar"></div>
          </div>
        )}
        <button
          onClick={() => setMessage(true)}
          className="w-[50px] absolute bottom-[-55px] right-[10px] h-[50px] rounded-full  bg-[#DCA715]"
        >
          <BiMessageRoundedDots className="text-3xl mx-auto text-black" />
        </button>
      </div>
    </div>
  );
};

export default Brand;
