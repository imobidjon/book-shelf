import * as React from "react";
import { GlobalStyles } from "./styles/Global";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/Auth/SignUp";
import SignIn from "./Pages/Auth/SignIn";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home";
import { useCookies } from "react-cookie";
import ProviderContext, { MainContext } from "./context/UserContext";
import { useLogin } from "./hooks";
import { MAIN_SECRET_NAME } from "./Constants";
import { Box } from "@mui/material";
import './App.css'

function App() {
  const [secret] = useCookies();
  const context = React.useContext(MainContext);
  const [user, setUser] = React.useState(context.user);

  const { data, isLoading } = useLogin({
    enabled: !!secret?.[MAIN_SECRET_NAME],
  });

  React.useEffect(() => {
    setUser(data || null);
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          height: '100vh'
        }}
      >
        <div className="text-center">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
          <p style={{ fontFamily: "Mulish, sans-serif" }}>Loading...</p>
        </div>
      </Box>
    );
  }

  return (
    <div className="App">
      <ProviderContext value={{ user, setUser }}>
        {user ? (
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route Component={Home} path="/" />
          </Routes>
        ) : (
          <Routes>
            <Route path="*" element={<SignIn />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        )}
      </ProviderContext>
      <div className="bgCube"></div>
    </div>
  );
}

export default App;
