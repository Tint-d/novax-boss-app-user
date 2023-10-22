import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { StateContextProvider } from "./context/StateContext.tsx";
import {I18nextProvider}  from "react-i18next";
import i18n from './services/i18nService.js'

const startApp = async() => {

ReactDOM.createRoot(document.getElementById("root")!).render(

  <I18nextProvider i18n={i18n}>
  <Provider store={store}>
    <StateContextProvider>
      <App />
    </StateContextProvider>
  </Provider>
  </I18nextProvider>

);

}
startApp();