import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  InputAdornment,
  TextField,
  CircularProgress,
} from "@mui/material";
import styled from "styled-components";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import { FieldValues, useForm } from "react-hook-form";
import { useSearch } from "../hooks";
import { toast } from "react-toastify";

const Search = styled(Box)`
  border-radius: 6px;
  margin-left: 24px;
  display: flex;
  align-items: center;
`;

const StyledInput = styled(TextField)`
  && .MuiInputBase-root {
    border-radius: 6px;
    border: 1px solid #ebebeb;
    background: #fefefe;
    height: 47px;
    width: 400px;
  }
`;

export interface ISearchItem {
  author: string;
  cover: string;
  isbn: string;
  published: number;
  title: string;
}

export interface ISearchHome {
  data: ISearchItem[];
  isOk: boolean;
  message: string;
}

export interface AppBarPorops {
  setIsSearch: (value: boolean) => void;
  setData: ([]) => void;
}

export const CustomAppBar = (props: AppBarPorops): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const { register, handleSubmit, getValues, watch } = useForm();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const searchBook = useSearch({
    onSuccess: (data: ISearchHome) => {
      props.setData(data.data);
      toast.success("Search fetched!");
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  React.useEffect(() => {
    const subscription = watch(() => {
      if (getValues("search").length < 2) {
        props.setData([]);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, getValues]);

  const handleSearch = (data: FieldValues) => {
    searchBook.mutate(data);
    props.setIsSearch(true);
  };

  const backBooks = () => {
    if (getValues("search") == "") {
      props.setIsSearch(false);
    }
  };
  return (
    <>
      <AppBar sx={{ background: "transparent", boxShadow: "none", px: "75px" }}>
        <Toolbar>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.2965 13.8285C23.4013 13.933 23.4844 14.0571 23.5411 14.1938C23.5978 14.3305 23.627 14.477 23.627 14.625C23.627 14.773 23.5978 14.9195 23.5411 15.0562C23.4844 15.1928 23.4013 15.317 23.2965 15.4215L16.5465 22.1715C16.442 22.2763 16.3179 22.3594 16.1812 22.4161C16.0445 22.4728 15.898 22.502 15.75 22.502C15.602 22.502 15.4555 22.4728 15.3188 22.4161C15.1822 22.3594 15.058 22.2763 14.9535 22.1715L11.5785 18.7965C11.4739 18.6919 11.3909 18.5677 11.3343 18.4311C11.2777 18.2944 11.2486 18.1479 11.2486 18C11.2486 17.8521 11.2777 17.7056 11.3343 17.5689C11.3909 17.4323 11.4739 17.3081 11.5785 17.2035C11.6831 17.0989 11.8073 17.0159 11.944 16.9593C12.0806 16.9027 12.2271 16.8736 12.375 16.8736C12.5229 16.8736 12.6694 16.9027 12.8061 16.9593C12.9427 17.0159 13.0669 17.0989 13.1715 17.2035L15.75 19.7842L21.7035 13.8285C21.808 13.7237 21.9322 13.6406 22.0688 13.5839C22.2055 13.5272 22.352 13.498 22.5 13.498C22.648 13.498 22.7945 13.5272 22.9312 13.5839C23.0679 13.6406 23.192 13.7237 23.2965 13.8285Z"
              fill="white"
            />
            <path
              d="M9.9135 7.5195C12.1623 5.5803 15.0305 4.50931 18 4.5C24.0525 4.5 29.0768 9 29.6235 14.8027C33.2055 15.309 36 18.3082 36 21.9893C36 26.0302 32.6295 29.25 28.5457 29.25H8.50725C3.843 29.25 0 25.5735 0 20.9655C0 16.9987 2.8485 13.7137 6.6195 12.8812C6.94125 10.9395 8.19 9.0045 9.9135 7.5195ZM11.3827 9.22275C9.6795 10.692 8.7885 12.4628 8.7885 13.8488V14.8568L7.78725 14.967C4.644 15.3112 2.25 17.892 2.25 20.9655C2.25 24.2663 5.0175 27 8.50725 27H28.5457C31.455 27 33.75 24.723 33.75 21.9893C33.75 19.2532 31.455 16.9762 28.5457 16.9762H27.4207V15.8512C27.423 10.8563 23.238 6.75 18 6.75C15.5697 6.75971 13.2229 7.63748 11.3827 9.225V9.22275Z"
              fill="#6200EE"
            />
          </svg>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, ml: 2 }}
          >
            <span style={{ color: "#6200EE" }}>Books</span> List
          </Typography>
          <Search component="form" onSubmit={handleSubmit(handleSearch)}>
            <StyledInput
              disabled={searchBook.isLoading}
              placeholder="Search for any training you want "
              {...register("search", {
                required: true,
                onChange: () => backBooks(),
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {searchBook.isLoading ? (
                      <CircularProgress color="warning" size={25} />
                    ) : (
                      <IconButton type="submit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21 21L16.65 16.65M11 6C13.7614 6 16 8.23858 16 11M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                            stroke="#151515"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, color: "#000" }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge color="error" badgeContent=" " variant="dot">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
};
