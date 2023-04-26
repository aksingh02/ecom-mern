import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [login, SetLogin] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  useEffect(() => {
    if (user != null) {
      SetLogin(true);
    }
  });

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleOpen = (e) =>{
     e.preventDefault(); 
     setOpen(false); 
  }

  const handleClose = (e) => {
    e.preventDefault();
    logout(dispatch, {});
    SetLogin(false);
    setOpen(false);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to ="/" style={{ textDecoration: "none", color: "black !important" }}>
          <Logo style ={{"color" : "black"}}>HumanWear</Logo>
          </Link>
        </Center>
        <Right>
          {!login ? (
            <>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <MenuItem style ={{"color" : "black"}}>REGISTER</MenuItem>
              </Link>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <MenuItem style ={{"color" : "black"}}>SIGN IN</MenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/logout"
                onClick={handleClickOpen}
                style={{ textDecoration: "none" }}
              >
                <MenuItem style ={{"color" : "black"}}>LOGOUT</MenuItem>
              </Link>
            </>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined style ={{"color" : "black"}} />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
      {open && (
        <>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Slide in alert dialog
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Logout?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to logout?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOpen} color="primary">
                Disagree
              </Button>
              <Button onClick={handleClose} color="primary">
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Container>
  );
};

export default Navbar;
