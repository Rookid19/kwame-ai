import { store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {

  const showToastMessage = () => {
    toast.error("Success Notification !", {
      position: 'top-center',
    });
  };


  return (
    <Provider store={store}>
       <button onClick={showToastMessage}>Notify</button>
        <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  );
}
