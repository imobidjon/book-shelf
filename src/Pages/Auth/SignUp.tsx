import styled from "styled-components";
import { Card, Box, Typography, Divider, TextField } from "@mui/material";
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";
import { CustomButton } from "../../Components/Button";
import { toast } from "react-toastify";
import { FieldValues, useForm } from "react-hook-form";
import { useCreateUser } from "../../hooks";
import { NavLink, useNavigate } from "react-router-dom";

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

const StyledInput = styled(TextField)`
  && .MuiInputBase-root {
    border-radius: 6px;
    border: 1px solid #ebebeb;
    background: #fefefe;
    height: 47px;
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

const SignUp = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createUser = useCreateUser({
    onSuccess: () => {
      toast.success("User created!");
      navigate("/");
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const onSubmit = (data: FieldValues) => {
    createUser.mutate(data);
  };

  return (
    <div>
      <StyledBox>
        <StyledCard>
          <Typography
            textAlign={"center"}
            fontSize={"36px"}
            marginBottom={"24px"}
            fontWeight={700}
          >
            Sign Up
          </Typography>
          <StyledGoogle>Continue with Google</StyledGoogle>
          <StyledFacebook iconColor={"#3b5998"}>
            Continue with Facebook
          </StyledFacebook>
          <Divider sx={{ my: "24px", fontFamily: "Mulish, sans-serif" }}>
            OR
          </Divider>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
          >
            {/* Name */}
            <StyledLabel htmlFor="name">Your Name</StyledLabel>
            <StyledInput
              id="name"
              error={errors?.name ? true : false}
              required
              fullWidth
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter your name"
            />

            {/* Email */}
            <Box sx={{ my: "10px" }}>
              <StyledLabel htmlFor="email">Your email</StyledLabel>
              <StyledInput
                id="email"
                error={errors?.email ? true : false}
                required
                fullWidth
                {...register("email", { required: true, pattern: /\S+@\S+\.\S+/, })}
                type="text"
                placeholder="Enter your email"
              />
            </Box>
            {/* UserName */}
            <StyledLabel htmlFor="username">Your username</StyledLabel>
            <StyledInput
              fullWidth
              id="username"
              error={errors?.key ? true : false}

              required
              {...register("key", { required: true })}
              type="text"
              placeholder="Enter your username"
            />
            <Box sx={{ my: "10px" }}>
              {/* Password */}
              <StyledLabel htmlFor="Password">Your password</StyledLabel>
              <StyledInput
                fullWidth
                id="Password"
                type="password"
                error={errors?.secret ? true : false}

                {...register("secret", { required: true, })}
                required
                placeholder="Enter your password"
              />
            </Box>
            {/* Button */}
            <CustomButton btnType="submit" btnText="Button" />
          </Box>

          <Typography textAlign={"center"} fontSize={"14px"} fontWeight={300}>
            Already signed up?{" "}
            <NavLink to={"/sign-in"} style={{ textDecoration: "none" }}>
              Go to sign in.
            </NavLink>
          </Typography>
        </StyledCard>
      </StyledBox>
    </div>
  );
};

export default SignUp;
