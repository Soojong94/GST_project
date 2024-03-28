import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ReorderIcon from '@mui/icons-material/Reorder';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import './App.css'
import WebIcon from '@mui/icons-material/Web';
import LogoutIcon from '@mui/icons-material/Logout';

export default function BasicList() {
  return (  
    <Box className='menu_bar'>

      <List>
        <ListItem disablePadding className='dashboard_menu'>
          <ListItemButton>
            <ReorderIcon />
            <ListItemText className="dashboard-text"  primary="대시보드" />
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListItem disablePadding className='dashboard_menu'>
          <ListItemButton>
            <ListItemIcon>
              <SubscriptionsIcon />
            </ListItemIcon>
            <ListItemText primary="팀 구독 게시판" />
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListItem disablePadding className='dashboard_menu'>
          <ListItemButton>
            <PeopleIcon />
            <ListItemText className="dashboard-text" primary="클랜 게시판" />
          </ListItemButton>
        </ListItem>
      </List>

      <List>
        <ListItem disablePadding className='dashboard_menu'>
          <ListItemButton component="a" href="#simple-list">
            <WebIcon />
            <ListItemText className="dashboard-text" primary="분석 게시판 (오픈 예정)" />
          </ListItemButton>
        </ListItem>
      </List>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <ListItem disablePadding className='dashboard_menu'>
        <ListItemButton component="a" href="#">
          <SettingsIcon />
          <ListItemText className="dashboard-text" primary="설정" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding className='dashboard_menu'>
        <ListItemButton component="a" href="#">
          <LogoutIcon />
          <ListItemText className="dashboard-text" primary="로그아웃" />
        </ListItemButton>
      </ListItem>

    </Box>
  );
}
