import * as React from "react";
import {
  Card,
  Typography,
  Box,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import styled from "styled-components";
import { useAddToLibrary, useRemoveFromLibrary } from "../hooks";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";

const StyledCard = styled(Card)`
  && {
    display: flex;
    width: 100%;
    padding: 32px;
    flex-direction: column;
    font-family: "Mulish" sans-serif;
    margin-top: 36px;
    gap: 16px;
    border-radius: 15px;
    border: 1px solid #ebebeb;
    background: #fefefe;
    box-shadow: 0px 4px 24px 0px rgba(51, 51, 51, 0.08);
    position: relative;
  }
`;

const StyledHoverBox = styled(Box)`
  && {
    position: relative;
  }
`;

const PagesBoxStyle = styled(Box)`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  border-radius: 8.5px;
  background: #efe6fd;
  color: #9654f4;
`;

const StyledFooter = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Actions = styled(Box)`
  position: absolute;
  top: 20px;
  right: -46px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export interface SearchCardPorops {
  SearchedBooks: {
    title: string;
    isbn: string;
    author: string;
    published: number;
  };
}

export default function SearchCard(props: SearchCardPorops) {
  const [isMouseEnter, setIsMouseEnter] = React.useState<boolean>(false);
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState<boolean>(false);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  function handleMouseOver() {
    setIsMouseEnter(true);
  }

  function handleMouseOut() {
    setIsMouseEnter(false);
  }

  const addToLib = useAddToLibrary({
    onSuccess: () => {
      toast.success("Book added!");
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const handleAddtoLib = (data: string) => {
    const body = {
      isbn: data,
    };

    addToLib.mutate(body);
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Box onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          {!isMouseEnter ? (
            <StyledCard>
              <Typography sx={{ color: "#151515", fontWeight: 600 }}>
                {props.SearchedBooks.title || "Unreachable title"}
              </Typography>
              <Typography sx={{ color: "#333333" }}>
                Lorem ipsum dolor sit amet consectetur. Nulla adipiscing neque
                varius vestibulum magna in. Tortor quisque nisl congue ut tellus
                sem id
              </Typography>
              <StyledFooter>
                <Typography>
                  {props.SearchedBooks.author || "Invalid name"}:{" "}
                  {props.SearchedBooks.published || "0000"}-year
                </Typography>
                <PagesBoxStyle>{"0000"} pages</PagesBoxStyle>
              </StyledFooter>
            </StyledCard>
          ) : (
            <StyledHoverBox>
              <StyledCard>
                <Typography sx={{ color: "#151515", fontWeight: 600 }}>
                  {props.SearchedBooks.title || "Unreachable title"}
                </Typography>
                <Typography sx={{ color: "#333333" }}>
                  Lorem ipsum dolor sit amet consectetur. Nulla adipiscing neque
                  varius vestibulum magna in. Tortor quisque nisl congue ut
                  tellus sem id
                </Typography>
                <StyledFooter>
                  <Typography>
                    {props.SearchedBooks.author || "Invalid name"}:{" "}
                    {props.SearchedBooks.published || "0000"}-year
                  </Typography>
                  <PagesBoxStyle>{"0000"} pages</PagesBoxStyle>
                </StyledFooter>
              </StyledCard>
              <Actions>
                <IconButton
                  onClick={() => handleAddtoLib(props.SearchedBooks.isbn)}
                  size="large"
                  disabled={addToLib.isLoading}
                  sx={{
                    borderRadius: "8px 8px 8px 0px",
                    backgroundColor: "#6200EE",
                    color: "primary.contrastText",
                    ":hover": { backgroundColor: "#8236ee" },
                    "& .MuiTouchRipple-root": { borderRadius: "8px" },
                  }}
                >
                  {addToLib.isLoading ? (
                    <CircularProgress color='warning' size={25} />
                  ) : (
                    <AddIcon />
                  )}
                </IconButton>
              </Actions>
            </StyledHoverBox>
          )}
        </Box>
      </Grid>
    </>
  );
}
