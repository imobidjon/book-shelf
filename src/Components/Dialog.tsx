import * as React from "react";
import styled from "styled-components";
import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { CustomButton } from "./Button";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddToLibrary, useSearch } from "../hooks";

const StyledDialogContent = styled(DialogContent)`
  && {
    display: flex;
    width: 430px;
    padding: 24px 28px;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    border-radius: 12px;
  }
`;

const StyledTopBox = styled(Box)`
  display: flex;
  width: 374px;
  justify-content: space-between;
  align-items: center;
  color: "#151515";
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

const ButtonBox = styled(Box)`
  && {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 100%;
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

export interface SimpleDialogProps {
  open: boolean;
  handleClose: (value: string) => void;
  setOpen: (value: boolean) => void;
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const { handleClose, open, setOpen } = props;
  const { register, handleSubmit, formState, reset, watch, getValues } = useForm();
  const { errors } = formState;

  const addToLib = useAddToLibrary({
    onSuccess: () => {
      toast.success("Book created!");
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const onSubmit = (data: FieldValues) => {
    addToLib.mutate(data);
    reset();
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
        },
      }}
    >
      <StyledDialogContent>
        <StyledTopBox>
          <Typography>Create a book</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CancelOutlinedIcon />
          </IconButton>
        </StyledTopBox>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
          }}
          component="form"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >

          <Box>
            <StyledLabel htmlFor="isbn">ISBN</StyledLabel>
            <StyledInput
              fullWidth
              id="isbn"
              required
              {...register("isbn", { required: true })}
              type="text"
              placeholder="Enter your isbn"
            />
          </Box>

          <ButtonBox>
            <CustomButton
              handleClickOpen={() => setOpen(false)}
              btnText="Close"
              btnVariant="outlined"
            />
            <CustomButton btnType="submit" btnText="Submit" />
          </ButtonBox>
        </Box>
      </StyledDialogContent>
    </Dialog>
  );
}
