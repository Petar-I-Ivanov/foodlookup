import { SWRConfig } from "swr";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ReactComponent as FaTimes } from "./assets/fa-times.svg";
import fetchClient from "./services/fetcher";
import HomePage from "./pages/HomePage";
import "./App.css";

const App = () => (
  <AppConfig>
    <AppRouting />
  </AppConfig>
);

const AppConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SWRConfig
    value={{
      fetcher: fetchClient.get,
    }}
  >
    <Toaster
      position="top-right"
      gutter={8}
      toastOptions={{
        duration: 5000,
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        custom: {
          duration: 5000,
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button
                  className="ToastCloseButton"
                  onClick={() => toast.dismiss(t.id)}
                >
                  <FaTimes />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
    {children}
  </SWRConfig>
);

const AppRouting = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
