import styled from "styled-components";
import { TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { useForm  } from "react-hook-form";



const StyledInput = styled(TextField)`
  && .MuiInputBase-root {
    border-radius: 6px;
    border: 1px solid #ebebeb;
    background: #fefefe;
    height: 47px;
  }
`;

interface TextFieldProps {
  inpPlaceholer: string;
  id?: string;
  icon?: JSX.Element;
}

export const CustomInput: React.FC<TextFieldProps> = ({
  inpPlaceholer,
  id,
  icon,
}) => {
  const { register } = useForm();

  return (
    <StyledInput
      {...register("title")}
      id={id}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ),
      }}
      fullWidth
      placeholder={inpPlaceholer}
    />
  );
};
