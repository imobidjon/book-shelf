import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Cookies } from "react-cookie";
import { IUser } from "../../types";
import { FieldValues, useForm } from "react-hook-form";
import { MainContext } from "../../context";
import { useLoginMyself } from "../../hooks";
import styled from "styled-components";
import { Card, Box, Typography, Divider, TextField } from "@mui/material";
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";
import { CustomButton } from "../../Components/Button";

const StyledCard = styled(Card)`
  && {
    background: #fefefe;
    border-radius: 12px;
    border: none;
    box-shadow: 0px 4px 32px 0px rgba(51, 51, 51, 0.04);
    width: 430px;
    padding: 48px 28px;
  }
`;

const StyledBox = styled(Box)`
  && {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    color: #000;
  }
`;

const StyledGoogle = styled(GoogleLoginButton)`
  && {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    border-radius: 4px !important;
    border: 1px solid#151515 !important;
    padding: 10px 24px !important;
    font-size: 16px !important;
    box-shadow: none !important;
  }
`;

const StyledFacebook = styled(FacebookLoginButton)`
  && {
    display: flex !important;
    margin-top: 16px !important;
    justify-content: center !important;
    align-items: center !important;
    border-radius: 4px !important;
    border: 1px solid #151515 !important;
    padding: 10px 24px !important;
    color: #151515 !important;
    background: transparent !important;
    font-size: 16px !important;
    box-shadow: none !important;
  }
`;

const StyledLabel = styled.label`
  color: #151515;
  font-feature-settings: "clig" off, "liga" off;
  font-family: "Mulish", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;

const SignIn = (): JSX.Element => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { register, handleSubmit } = useForm();
  const { setUser } = useContext(MainContext);

  const getMyself = useLoginMyself({
    onSuccess: (data: IUser) => {
      setUser(() => data);
      navigate("/");
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const onSubmit = (data: FieldValues) => {
    cookies.set("secret", data.secret);
    cookies.set("key", data.key);
    getMyself.mutate({});
  };

  return (
    <div>
      <StyledBox>
        <StyledCard>
          <Typography
            textAlign={"center"}
            fontSize={"36px"}
            marginBottom={"36px"}
            fontWeight={700}
          >
            Sign In
          </Typography>
          <StyledGoogle>Continue with Google</StyledGoogle>
          <StyledFacebook iconColor={"#3b5998"}>
            Continue with Facebook
          </StyledFacebook>
          <Divider sx={{ my: "36px", fontFamily: "Mulish, sans-serif" }}>
            OR
          </Divider>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
          >
            {/* UserName */}
            <StyledLabel htmlFor="username">Your username</StyledLabel>
            <TextField
              fullWidth
              id="username"
              required
              {...register("key", { required: true })}
              type="text"
              placeholder="Enter your username"
            />
            <Box sx={{ my: "24px" }}>
              {/* Password */}
              <StyledLabel htmlFor="Password">Your password</StyledLabel>
              <TextField
              fullWidth
                id="Password"
                type="password"
                {...register("secret", { required: true })}
                required
                placeholder="Enter your password"
              />
            </Box>
            {/* Button */}
            <CustomButton btnType="submit" btnText="Button" />
          </Box>

          <Typography textAlign={"center"} fontSize={"14px"} fontWeight={300}>
            Don't have an account?{" "}
            <NavLink to={"/sign-up"} style={{ textDecoration: "none" }}>
              Go to sign up.
            </NavLink>
          </Typography>
        </StyledCard>
      </StyledBox>
    </div>
  );
};

export default SignIn;
