import Routes from "./routes/Routes";
import { selectLanguage } from "./redux/services/settinSlice";
import { useAppSelector } from "./redux/hook";
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css';
const App = () => {

  const language = useAppSelector(selectLanguage);
  console.log(language);

  return (
    <div className=" font-engFont max-w-[100%]  h-screen bg-[#0E1217] ">
      <Routes />
    </div>
  );
};

export default App;
