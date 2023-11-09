import styled from "styled-components";
import { Button } from "@mui/material";


const StyledButton = styled(Button)`
  && {
    background: ${props => (props.variant === "outlined" ? `none` : `#6200ee`)};
    color: ${props => (props.variant === "outlined" ? `#6200ee` : `#fefefe`)};
    border-radius: 4px;
    border: none;
    padding: 10px 24px;
    width: 100%;
    border: ${props => (props.variant === "outlined" ? `1px solid #6200EE` : `none`)};
  }
  &&:hover {
    background:#8236ee;
    color: #fefefe;
  }
`;
interface ButtonProps {
  btnText: string;
  btnVariant?: 'contained' | 'outlined'
  AddIcon?: JSX.Element
  handleClickOpen?: () => void;
  btnType?: "button" | "submit" | "reset" 
}

export const CustomButton: React.FC<ButtonProps> = ({ btnText, btnVariant, AddIcon, handleClickOpen, btnType }) => {
  return <StyledButton onClick={handleClickOpen} type={btnType} variant={btnVariant} startIcon={AddIcon}>{btnText}</StyledButton>;
};
