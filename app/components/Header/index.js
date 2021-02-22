/**
 *
 * Header
 *
 */

import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@material-ui/core';
import LogoSGFT from 'images/main-logo.png';
import Banner from 'images/banner-01.jpg';
import history from 'utils/history';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { Carousel } from 'react-bootstrap';
import { setUserInfoRoute } from 'utils/storage';

import PropTypes from 'prop-types';
// import styled from 'styled-components';
const useStyles = makeStyles(theme => ({
  appHeader: {
    marginTop: theme.spacing(0),
    // background: `url(${Banner})`,
    minWidth: '100%',
    minHeight: '40vh',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  toolbar: {
    margin: theme.spacing(1),
    // [theme.breakpoints.down('xs')]: {
    //   visibility: 'hidden',
    // },
  },
  itemTop: {
    [theme.breakpoints.down('xs')]: {
      visibility: 'hidden',
    },
  },
  list: {
    width: 320,
  },
  logoBanner: {
    height: 128,
    display: 'flex',
    justifyContent: 'center',
    background: theme.palette.primary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
}));
function Header({ name }) {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = open => {
    setOpenDrawer(open);
  };
  return (
    <div>
      <AppBar position="relative">
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              className={classes.menuButton}
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor="left"
              open={openDrawer}
              onClose={() => toggleDrawer(false)}
              onOpen={() => toggleDrawer(true)}
            >
              <div
                className={classes.list}
                role="presentation"
                onClick={() => toggleDrawer(false)}
                onKeyDown={() => toggleDrawer(false)}
              >
                <Box className={classes.logoBanner}>
                  <img
                    src={LogoSGFT}
                    alt="logo"
                    style={{
                      width: 128,
                      height: 'auto',
                      display: 'block',
                      margin: 'auto',
                    }}
                  />
                </Box>
                <Divider />
                <List>
                  <ListItem
                    button
                    onClick={() => {
                      setUserInfoRoute('create-order');
                      history.push('/yeucau');
                    }}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Tạo khoản ứng lương" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => history.push('/yeucau/danh-sach')}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Danh sách yêu cầu" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => {
                      setUserInfoRoute('update-customer');
                      history.push('/yeucau/thong-tin-co-ban');
                    }}
                  >
                    <ListItemIcon primary="Thông tin cá nhân" />
                    <ListItemText />
                  </ListItem>
                </List>
                <Divider />
                <List>
                  <ListItem
                    button
                    onClick={() => history.push('/yeucau/gioi-thieu')}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Giới thiệu" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => history.push('/yeucau/huong-dan')}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Hướng dẫn" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => history.push('/yeucau/hoi-dap')}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Hỏi đáp" />
                  </ListItem>
                </List>
                <Divider />
                <List>
                  <ListItem button onClick={() => history.push('/logout')}>
                    <ListItemIcon />
                    <ListItemText primary="Đăng xuất" />
                  </ListItem>
                </List>
              </div>
            </SwipeableDrawer>
            <Button component={Link} to="/">
              <img
                src={LogoSGFT}
                alt="logo"
                style={{
                  width: 128,
                  height: 'auto',
                }}
              />
            </Button>
            <Button
              className={classes.itemTop}
              color="inherit"
              onClick={() => {
                setUserInfoRoute('create-order');
                history.push('/');
              }}
            >
              <Typography variant="body2" color="inherit" noWrap>
                <Box component="span" fontWeight="fontWeightBold">
                  Tạo khoản ứng lương
                </Box>
              </Typography>
            </Button>
            <Button
              className={classes.itemTop}
              color="inherit"
              onClick={() => {
                history.push('/yeucau/danh-sach');
              }}
            >
              <Typography variant="body2" color="inherit" noWrap>
                <Box component="span" fontWeight="fontWeightBold">
                  Danh sách yêu cầu
                </Box>
              </Typography>
            </Button>
            <Button
              className={classes.itemTop}
              color="inherit"
              onClick={() => {
                setUserInfoRoute('update-customer');
                history.push('/yeucau/thong-tin-ca-nhan');
              }}
            >
              <Typography variant="body2" color="inherit" noWrap>
                <Box component="span" fontWeight="fontWeightBold">
                  Thông tin cá nhân
                </Box>
              </Typography>
            </Button>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Button
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                startIcon={<AccountCircle />}
              >
                <Typography variant="body2" color="inherit" noWrap>
                  <Box component="span" fontWeight="fontWeightBold">
                    {name}
                  </Box>
                </Typography>
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  history.push('/logout');
                }}
              >
                <Typography variant="body2" color="inherit" noWrap>
                  <Box component="span" fontWeight="fontWeightBold">
                    Đăng xuất
                  </Box>
                </Typography>
              </Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Carousel indicators={false}>
        <Carousel.Item interval={2000}>
          <img
            width={1}
            className="d-block w-100"
            src={Banner}
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string,
};

export default Header;
