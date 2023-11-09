import * as React from "react";

import { CustomAppBar, ISearchItem } from "../Components/AppBar";
import { Box, Toolbar, Grid } from "@mui/material";
import { TopBar } from "../Components/TopBar";
import SimpleDialog from "../Components/Dialog";
import Book from "./books";
import BookCard from "../Components/BookCard";
import SearchCard from "../Components/SearchCard";

export default function Home() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isSearch, setIsSearch] = React.useState(false);
  const [data, setData] = React.useState<ISearchItem[]>([]);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ px: "100px" }}>
      <SimpleDialog setOpen={setOpen} open={open} handleClose={handleClose} />
      <CustomAppBar setIsSearch={setIsSearch} setData={setData} />
      <Box component="main">
        <Toolbar />
        <TopBar handleClickOpen={() => handleClickOpen()} />
        <Box sx={{ overflowY: "scroll", height:'100vh', pr:10 }}>
          {!isSearch ? (
            <Book />
          ) : (
            <>
              <Grid container columnSpacing={6} rowSpacing={1}>
                {data?.map((bookObj) => (
                  <SearchCard SearchedBooks={bookObj} key={bookObj?.isbn} />
                ))}
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
