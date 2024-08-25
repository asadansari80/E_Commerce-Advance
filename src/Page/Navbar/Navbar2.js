import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Logout, Setting } from "../../Component/UserMenu";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Button, Popover } from "@mui/material";
import { getProductDetails } from "../../Service/ProductService";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart } from "../../Redux/cartSlice";

const settings = ["Profile", <Setting />, <Logout />];

function Navbar2(props) {
  const userDetails = useSelector((state) => state.user.user);
  // console.log(state);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const cart = JSON.parse(localStorage.getItem("cart")) || {};
  // console.log(cart,"ll");
  const cartItemCount = useSelector((state) => state.cart.quantity);
  const productId = useSelector((state) => state.cart.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // const userDetails = localStorage.getItem("user");
  // const parseUserDetails = JSON.parse(userDetails);

  const [productDetail, setProductDetail] = React.useState([]);

  // console.log(productId, "ff");
React.useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetailsFromApi = productId.map((details) => {
        // console.log(id);
        return getProductDetails(details.id);
      });
      // console.log(productDetailsFromApi);
      const product = Promise.all(productDetailsFromApi).then((response) => {
        // console.log(response);
        setProductDetail(response);
      });
    };
    fetchProductDetails();
  }, [productId]);

  const handleRemove = (productId) => {
    dispatch(removeProductFromCart(productId));
  };
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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Box>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            HOME{" "}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />

          {token ? (
            userDetails.role === "admin" ? (
              <Typography
                variant="caption"
                fontSize="20px"
                fontWeight="bold"
                fontFamily="monospace"
                paddingRight="40px"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/product/new");
                }}
              >
                Create Product
              </Typography>
            ) : null
          ) : null}

          <Box sx={{ px: "20px" }}>
            {" "}
            {token && userDetails.role === "user" ? (
              <Box
                sx={{ position: "relative", cursor: "pointer" }}
                onClick={handleClick}
              >
                {cartItemCount > 0 ? (
                  <Box
                    sx={{
                      height: "16px",
                      width: "16px",
                      backgroundColor: "yellowgreen",
                      borderRadius: "50%",
                      position: "absolute",
                      right: "1px",
                      top: "0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "9px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {cartItemCount}
                  </Box>
                ) : null}
                <AiOutlineShoppingCart size={30} />
              </Box>
            ) : null}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  {typeof setting === "string" ? (
                    <Typography textAlign="center">{setting}</Typography>
                  ) : (
                    setting
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box>
          {productDetail.map((product) => {
            // console.log(product.data.product, "kk");
            return (
              <Box
                display="flex"
                alignItems="baseline"
                justifyContent="space-around"
                fontSize="10px"
                sx={{ p: 1, borderBottom: "1px solid lightgray" }}
              >
                {" "}
                <Box>
                  <Typography>{product.data.product.name}</Typography>
                  <Typography
                    variant="subtitle"
                    color="GrayText"
                    fontSize="10px"
                  >
                    {product.data.product.description}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontSize="10px"
                    sx={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "orange",
                    }}
                    onClick={() => {
                      handleRemove(product.data.product._id);
                      // console.log(product.data.product,"77");
                    }}
                  >
                    remove
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box textAlign="center">
          <Button
            type="button"
            variant="contained"
            sx={{
              backgroundColor: "gold",
              fontWeight: "bold",
              marginY: "10px",
              fontSize: "10px",
              color: "white",
              "&:hover": {
                backgroundColor: "gold",
                color: "black",
              },
            }}
            onClick={() => {
              navigate("/CheckoutPage");
            }}
          >
            Checkout
          </Button>
        </Box>
      </Popover>
    </AppBar>
  );
}

export default Navbar2;
