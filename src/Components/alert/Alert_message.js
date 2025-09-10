import { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const showAlert = (message, type = "error") => {
    toast(message, {
      autoClose: 2500,
      progressClassName: type === "success" ? "custom-progress-bar-green" : "custom-progress-bar-red",
      
    });
  };
  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <ToastContainer />
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
