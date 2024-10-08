import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from "react-router-dom";
import { HOME_PAGE, BOUGHT_TICKET_MANEMENT_PAGE, PROFILE_PAGE, MAIN_COLOR, FONT_MAIN } from "../config/Constant"
import { Button } from "@mui/material";
import HttpStatus from "../config/HttpStatus";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import API from "../config/API";
/**
 * Author: Phan Nguyễn Mạnh Cường
 */
const settings = ["Quản lý tài khoản", "Vé Đã Mua", "Đăng Xuất"];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',

    },
  },
}));


function Header() {

  const { logoutUser } = React.useContext(AuthContext)

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [search, setSearch] = React.useState("Search for the Ticket");
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleEventUser = (e) => {
    if (e === 'Đăng Xuất') {
      // localStorage.removeItem(USER_ID_KEY);
      // navigate(LOGIN_PAGE);
      logoutUser();
      return;
    }
    if (e === 'Vé Đã Mua') {
      navigate(BOUGHT_TICKET_MANEMENT_PAGE);
      return;
    }
    if (e === 'Quản lý tài khoản')
      navigate(PROFILE_PAGE)
    return;
  };

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value === '') {
        setSearch("Search for the Ticket")
      }
      console.log("User Search:", search);
    }
  }

  const handleHomepage = () => {
    navigate(HOME_PAGE)
  }

  const [user, setUser] = React.useState(null);
  const api = useAxios();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(API.User.GET_USER_INFO)
      if (response.data.httpStatus === HttpStatus.OK) {
        setUser(response.data.object)
      }
    }
    fetchData().catch(console.error)
  }, [])


  return (
    <AppBar style={{ backgroundColor: MAIN_COLOR }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <LocalActivityIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <img src="..\..\src\assets\logo\LogoTab-Photoroom.png" style={{ maxHeight: '40px' }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: FONT_MAIN,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              marginLeft: '1%'
            }}
            onClick={handleHomepage}
          >
            Ticket Resell
          </Typography>


          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: FONT_MAIN,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Ticket Resell
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Search sx={{ width: { xs: '80%', md: '50%' } }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={search}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchInput}
                onKeyDown={handleSearchKeyDown}
              />
            </Search>
          </Box>

          {
            !user ?
              <Box sx={{ flexGrow: 0 }}>
                <Button href="/login" sx={{ color: 'white' }} >Đăng nhập/Đăng ký</Button>
              </Box>
              :
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip className="d-flex align-items-md-center" title="Open settings">
                  <span className="mx-3">{user.firstname + " " + user.lastname}</span>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                    <Avatar alt="Remy Sharp" src={!user || !user.avatar ? "/broken-image.jpg" : "data:image/png;base64, " + user.avatar} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleEventUser(setting);
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

