import Routes from "./routes/Routes";
import React from 'react'
import { selectLanguage } from "./redux/services/settinSlice";
import { useAppSelector } from "./redux/hook";
const App = () => {

  const language = useAppSelector(selectLanguage);
  console.log(language);

  return (
    <div className=" font-engFont max-w-[100%] text-white h-screen bg-[#0E1217] ">
      <Routes />
    </div>
  );
};

export default App;
