import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import "../App.scss";
import MenuIcon from '@mui/icons-material/Menu';
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Socials from "./Socials";
import useAuthStore from '../stores/authStore';

export default function Header() {
  const Nav = tw.nav`flex justify-between text-base align-center`;
  const Container = tw.header`invisible absolute top-2 left-5 text-gray-600 body-font links md:visible`;
  const GridItem = tw.div`animate__animated animate__bounceInUpInUp animate__delay-1s`

  return (<>
    <HeaderSM />
    <HeaderLG />
    </>
  );
}

function HeaderLG () {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    // Redirect to the login page
    window.location.href = '/login';
  };

  return <header className="headerLG text-gray-600 body-font bg-gray-200">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Link to="/" className="mr-5 hover:text-gray-900">
      <span className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="ml-3 text-xl">Library</span>
      </span>
    </Link>
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      { !user && <Link to="/login" className="mr-5 hover:text-gray-900">Login</Link>}
      {/* <Link to="/libraries" className="mr-5 hover:text-gray-900">Libraries</Link> */}
      <Link to="/library" className="mr-5 hover:text-gray-900">Library</Link>
      <Link to="/about" className="mr-5 hover:text-gray-900">About</Link>
      <Link to="/contact " className="mr-5 hover:text-gray-900">Contact</Link>
      { user && <Link to="# " className="mr-5 hover:text-gray-900" onClick={handleLogout}>
        Logout
      </Link>}
    </nav>
    <span className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
      {/* only open this when the socials are connected */}
      {/* <Socials /> */}
    </span>
  </div>
</header>
}

function HeaderSM() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user, logout } = useAuthStore();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  

  const handleLogout = () => {
    logout();
    // Redirect to the login page
    window.location.href = '/login';
  };

  return (
    <div className="visible md:hidden">
      <Button style={{position:'absolute', top: '0.5em', left: '1.5em'}}
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}  variant="outlined" >
        <MenuIcon />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/">
            <Button variant="text"> Home</Button>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {!user && <Link to="login">
            <Button variant="text">login</Button>
          </Link>}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="articles">
            <Button variant="text">articles</Button>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button variant="text">
            <Link to="contact"> contact</Link>
          </Button>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="about">
            <Button variant="text">about</Button>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          {user && <Link to="#">
            <Button variant="text">Logout</Button>
          </Link>}
        </MenuItem>
      </Menu>
    </div>
  );
}
