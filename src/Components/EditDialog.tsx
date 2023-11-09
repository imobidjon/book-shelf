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
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { CustomButton } from "./Button";
import { useForm, FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { useEditBook } from "../hooks";

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
  book: {
    id: number
  }
  BookStatus: number | string
}

export default function EditDialog(props: SimpleDialogProps) {
  const { handleClose, open, setOpen, BookStatus, book } = props;
  const { register, handleSubmit } = useForm({
    defaultValues: {
      status: BookStatus,
    },
  });

  const editBook = useEditBook({
    onSuccess: () => {
      toast.success("Book edited");
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
  
  const onSubmit = (data: FieldValues) => {
    const id: number = book.id;
    editBook.mutate({ id, data} );
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
          <Typography>Edit a book</Typography>
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
          <FormControl fullWidth>
            <StyledLabel htmlFor="isbn">Status</StyledLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              defaultValue={BookStatus}
              {...register("status")}
            >
              <MenuItem value={0}>New</MenuItem>
              <MenuItem value={1}>Reading</MenuItem>
              <MenuItem value={2}>Finished</MenuItem>
            </Select>
          </FormControl>
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
