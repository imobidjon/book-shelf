import { CircularProgress, Grid, Box } from "@mui/material";
import BookCard from "../../../Components/BookCard";
import { IBooksList } from "./type";

export default function BooksList({ data, isLoading }: IBooksList) {
  return (
    <Box>
      {isLoading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
      <Grid
        container
        columnSpacing={6}
        rowSpacing={1}
      >
        {data?.data?.map((bookObj) => (
          <BookCard book={bookObj.book} BookStatus={bookObj?.status} key={bookObj?.book?.isbn} />
        ))}
      </Grid>
    </Box>
  );
}
