import { Box, Typography } from "@mui/material";
import { CustomInput } from "./Input";
import { CustomButton } from "./Button";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import {useAllBooks} from "../hooks";


const BoxWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fefefe;
`;

const BtnInpWrapper = styled(Box)`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Text = styled(Typography)`
  && {
    color: #fefefe;
    font-family: "Mulish" sans-serif;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

interface TopBarProps {
    handleClickOpen: () => void
}


export const TopBar = ({ handleClickOpen }: TopBarProps) => {
const {data} = useAllBooks();


  
  return (
    <Box sx={{ py: "36px" }}>
      <BoxWrapper>
        <Box>
          <Text noWrap>
            You've got <span style={{ color: "#6200EE" }}>{data?.data?.length || 0} book</span>
          </Text>
        </Box>
        <BtnInpWrapper>
          <Box>
            <CustomInput inpPlaceholer="Enter your name" />
          </Box>
          <Box sx={{fontSize: '16px'}}>
            <CustomButton
              handleClickOpen={() => handleClickOpen()}
              AddIcon={<AddIcon />}
              btnText={"Create a book"}
            />
          </Box>
        </BtnInpWrapper>
      </BoxWrapper>
      <Box>
        <Typography
          sx={{ color: "#fefefe" }}
          variant="h6"
          noWrap
          component="div"
        >
          Your task today
        </Typography>
      </Box>
    </Box>
  );
};
