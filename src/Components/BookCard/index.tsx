import * as React from "react";
import { Card, Typography, Box, IconButton, Grid } from "@mui/material";
import styled from "styled-components";
import { IBookCard, IRemovedBookData } from "./type";
import { useRemoveFromLibrary } from "../../hooks";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import EditDialog from "../EditDialog";

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
  right: -41px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export default function BookCard(props: IBookCard) {
  const [isMouseEnter, setIsMouseEnter] = React.useState<boolean>(false);
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState<boolean>(false);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const removeFromLibrary = useRemoveFromLibrary({
    onSuccess: (data: IRemovedBookData) => {
      if (data) {
        queryClient.invalidateQueries(["get-all"]).then();
        toast.warning("Removed");
      }
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const handleRemove = (id: number) => {
    const confirmation = window.confirm(
      "Are you sure to delete this book from your library?"
    );
    if (confirmation) removeFromLibrary.mutate({ id });
  };

  function handleMouseOver() {
    setIsMouseEnter(true);
  }

  function handleMouseOut() {
    setIsMouseEnter(false);
  }

  return (
    <>
      <EditDialog  book={props.book} BookStatus={props.BookStatus} setOpen={setOpen} open={open} handleClose={handleClose} />
      <Grid item xs={12} sm={6} md={4}>
        <Box onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          {!isMouseEnter ? (
            <StyledCard>
              <Typography sx={{ color: "#151515", fontWeight: 600 }}>
                {props.book.title || "Unreachable title"}
              </Typography>
              <Typography sx={{ color: "#333333" }}>
                Lorem ipsum dolor sit amet consectetur. Nulla adipiscing neque
                varius vestibulum magna in. Tortor quisque nisl congue ut tellus
                sem id
              </Typography>
              <StyledFooter>
                <Typography>
                  {props.book.author|| 'Invalid name'}: {props.book.published ||  '0000'}-year
                </Typography>
                <PagesBoxStyle>{props.book.pages  || "0000"} pages</PagesBoxStyle>
              </StyledFooter>
            </StyledCard>
          ) : (
            <StyledHoverBox>
              <StyledCard>
                <Typography sx={{ color: "#151515", fontWeight: 600 }}>
                  {props.book.title|| "Unreachable title"}
                </Typography>
                <Typography sx={{ color: "#333333" }}>
                  Lorem ipsum dolor sit amet consectetur. Nulla adipiscing neque
                  varius vestibulum magna in. Tortor quisque nisl congue ut tellus
                  sem id
                </Typography>
                <StyledFooter>
                  <Typography>
                    {props.book.author|| 'Invalid name'}: {props.book.published || '0000'}-year
                  </Typography>
                  <PagesBoxStyle>{props.book.pages || "0000"} pages</PagesBoxStyle>
                </StyledFooter>
              </StyledCard>
              <Actions>
                <IconButton
                  onClick={() => handleRemove(props.book.id)}
                  size="large"
                  sx={{
                    borderRadius: "8px 8px 8px 0px",
                    backgroundColor: "#FF4D4F",
                    color: "primary.contrastText",
                    ":hover": { backgroundColor: "#ef6466" },
                    "& .MuiTouchRipple-root": { borderRadius: "8px" },
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                  >
                    <path
                      d="M11.3334 3.99998V3.46665C11.3334 2.71991 11.3334 2.34654 11.1881 2.06133C11.0603 1.81044 10.8563 1.60647 10.6054 1.47864C10.3202 1.33331 9.94682 1.33331 9.20008 1.33331H8.13341C7.38668 1.33331 7.01331 1.33331 6.72809 1.47864C6.47721 1.60647 6.27324 1.81044 6.14541 2.06133C6.00008 2.34654 6.00008 2.71991 6.00008 3.46665V3.99998M7.33341 7.66665V11M10.0001 7.66665V11M2.66675 3.99998H14.6667M13.3334 3.99998V11.4666C13.3334 12.5868 13.3334 13.1468 13.1154 13.5746C12.9237 13.951 12.6177 14.2569 12.2414 14.4487C11.8136 14.6666 11.2535 14.6666 10.1334 14.6666H7.20008C6.07998 14.6666 5.51992 14.6666 5.0921 14.4487C4.71578 14.2569 4.40982 13.951 4.21807 13.5746C4.00008 13.1468 4.00008 12.5868 4.00008 11.4666V3.99998"
                      stroke="#FEFEFE"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconButton>
                <IconButton
                  onClick={()=>handleClickOpen()}
                  size="large"
                  sx={{
                    borderRadius: "0px 8px 8px 8px",
                    backgroundColor: "#6200EE",
                    color: "primary.contrastText",
                    ":hover": { background: "#8236ee" },
                    "& .MuiTouchRipple-root": { borderRadius: "8px" },
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                  >
                    <path
                      d="M14.6667 12L14 12.7294C13.6464 13.1161 13.1668 13.3333 12.6668 13.3333C12.1668 13.3333 11.6873 13.1161 11.3337 12.7294C10.9796 12.3434 10.5001 12.1267 10.0002 12.1267C9.50033 12.1267 9.02084 12.3434 8.66673 12.7294M2.66675 13.3333H3.78311C4.10923 13.3333 4.27229 13.3333 4.42574 13.2965C4.56179 13.2638 4.69185 13.21 4.81115 13.1369C4.9457 13.0544 5.061 12.9391 5.2916 12.7085L13.6668 4.33334C14.219 3.78106 14.219 2.88563 13.6668 2.33334C13.1145 1.78106 12.219 1.78106 11.6668 2.33334L3.29159 10.7085C3.06099 10.9391 2.94568 11.0544 2.86323 11.189C2.79012 11.3083 2.73625 11.4383 2.70359 11.5744C2.66675 11.7278 2.66675 11.8909 2.66675 12.217V13.3333Z"
                      stroke="#FEFEFE"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconButton>
              </Actions>
            </StyledHoverBox>
          )}
        </Box>
      </Grid>
    </>
  );
}
