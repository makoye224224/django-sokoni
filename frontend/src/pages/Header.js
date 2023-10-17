import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import sokoni from "../media/sokoni.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import {
  Badge,
  Button,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { useStateContext } from "../context/Context";
import {
  Avatar,
  Popover,
  List,
  ListItem,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaPowerOff,
  FaEnvelope,
  FaShoppingBasket,
  FaCartArrowDown,
  FaCartPlus,
} from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
  },
}));

const useStyles = makeStyles((theme) => ({
  popover: {
    backgroundColor: "#212529", // Replace this with your header's background color
  },
}));

export default function Header() {
  const { cart, Collections, ProductsInCollection} = useStateContext();
  const [collections, setCollections] = useState([]);
  const user = localStorage.getItem("user");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);

  const history = useHistory(); 

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const classes = useStyles(); 
  // Get the first three collections
  const firstThreeCollections = collections?.slice(0, 10);

  // Get the rest of the collections for the dropdown
  const restCollections = collections?.slice(10);

  const handleSearchIconClick = () => {
    setIsSearchIconClicked(!isSearchIconClicked);
  };
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const settings = [
    { name: "Account", link: "/account" },
    { name: "Logout", link: "/" },
    {
      name: user && user.business_name ? "My Products" : "My Orders",
      link: user && user.business_name ? "/products" : "/orders",
    },
  ];

  const set = [
    { name: "Login", link: "/login" },
    { name: "register", link: "/register" },
  ];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  React.useEffect(() => {
    Collections()
      .then((collections) => {
    
        setCollections(collections);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#212529" }}>
      <AppBar position="static" sx={{ backgroundColor: "#212529" }}>
        <StyledToolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, alignSelf: "flex-end" }}
          >
            <a href="/">
              <img
                src={sokoni}
                style={{
                  height: "90px",
                  width: "90px",
                  marginTop: "-15px",
                }}
                alt="sokoni logo"
                className="img-fluid"
              />
            </a>
          </Typography>
          {!isSmallScreen ? (
        <div style={{ marginTop: "43px" }}>
          <div className="row align-items-center">
            <div className="col">
              {firstThreeCollections?.length >0 && firstThreeCollections?.map((collection) => (
                <Link
                  key={collection.id}
                  to="/#"
                  style={{
                    textDecoration: "none",
                    marginRight: "10px",
                    marginTop: "20px",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    ProductsInCollection(collection?.id);
                    history.push('/'); 
                  }}
                >
                  {collection.title}
                </Link>
              ))}
            </div>
            {restCollections?.length > 0 && (
              <div className="col">
                <NavDropdown title="More Collections" id="collasible-nav-dropdown">
                  {restCollections?.map((collection) => (
                    <NavDropdown.Item key={collection.id} href="#action/3.1" onClick={(e) => {
                      e.preventDefault();
                      ProductsInCollection(collection?.id);
                      history.push('/'); 
                    }}>
                      {collection?.title}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              </div>
            )}
          </div>
        </div>
      ) :
      (<NavDropdown title="Collections" id="collasible-nav-dropdown"
      style={{
        textDecoration: "none",
        marginRight: "30px",
        marginTop: "40px",
      }}>
       {collections?.map((collection) => (
        <NavDropdown.Item key={collection.id} href="#action/3.1" onClick={(e) => {
          e.preventDefault();
          ProductsInCollection(collection?.id);
          history.push('/'); 
        }}>
          {collection?.title}
        </NavDropdown.Item>
      ))} 
    </NavDropdown>)}

          <Link to="/cart" style={{ textDecoration: "none" }}>
            <div style={{ position: "relative" }}>
              <ShoppingCartIcon
                style={{
                  color: "#2dace4",
                  width: "30px",
                  height: "30px",
                  marginTop: "43px",
                }}
              />
              <Badge
                style={{
                  color: "red",
                  position: "absolute",
                  top: "30px",
                  right: "-8px",
                  scale: "120%",
                }}
              >
                {cart && cart.length}
              </Badge>
            </div>
          </Link>
          <div style={{ marginTop: "35px", marginLeft: "8px" }}>
            <Tooltip title="Open Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User"
                  src="https://shorturl.at/eOTX9"
                  sx={{
                    display: { xs: "flex    ", md: "flex" },
                    mr: 2,
                    width: { xs: 40, md: 60 },
                    height: { xs: 40, md: 60 },
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        </StyledToolbar>
      </AppBar>

      <Popover
        id="menu-appbar"
        open={Boolean(anchorElUser)}
        anchorEl={anchorElUser}
        onClose={handleCloseUserMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        classes={{ paper: classes.popover }} // Add this line to apply the custom style
      >
        <List style={{ backgroundColor: "#D3D3D3" }}>
          {user
            ? settings?.map((set) => (
                <ListItem
                  key={set.name}
                  onClick={() => {
                    if (set.name === "Logout") {
                      localStorage.removeItem("user");
                      toast.success("logged out successfully");
                    }
                    setAnchorElUser(null);
                  }}
                  component="a"
                  href={set.link}
                >
                  <Typography textAlign="center">{set.name}</Typography>
                </ListItem>
              ))
            : set?.map((setting) => (
                <ListItem
                  key={setting.name}
                  onClick={handleCloseUserMenu}
                  component="a"
                  href={setting.link}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </ListItem>
              ))}
        </List>
      </Popover>
    </Box>
  );
}
