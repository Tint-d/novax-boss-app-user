import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { StateContextProvider } from "./context/StateContext.tsx";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StateContextProvider>
      <MantineProvider>
        <App />
      </MantineProvider>
    </StateContextProvider>
  </Provider>
);
