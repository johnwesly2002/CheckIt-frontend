import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { getCurrentUser, LogoutUser } from '../../store/reducers/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import BackDrop from '../shared/BackDrop';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector(getCurrentUser);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(LogoutUser());
    navigate("/login");
    handleClose();
  }

  return (
		<React.Fragment>
			<Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
				<Tooltip title="Account settings">
					<IconButton onClick={handleClick} size="medium">
						<Avatar sx={{ width: 42, height: 42 }}>
							{user?.username.charAt(0).toUpperCase()}
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: "visible",
							filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
							mt: 1.5,
							"& .MuiAvatar-root": {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							"&::before": {
								content: '""',
								display: "block",
								position: "absolute",
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: "background.paper",
								transform: "translateY(-50%) rotate(45deg)",
								zIndex: 0,
							},
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<Link to="/profile">
					<MenuItem className="flex gap-2" onClick={handleClose}>
						<Avatar />
						<span className="font-semibold text-[16px] mt-1">
							{user?.username}
						</span>
					</MenuItem>
				</Link>
				<Divider />
				<Link to="/profile/order">
					<MenuItem onClick={handleClose}>
						<ListItemIcon>
							<LocalShippingIcon fontSize="small" />
						</ListItemIcon>
						Order
					</MenuItem>
				</Link>
				<MenuItem onClick={logoutHandler}>
						<ListItemIcon>
							<Logout
								fontSize="small"
								 sx={{
                  color: "red",
                }}
							/>
						</ListItemIcon>
						<span className='text-red-500'>Logout</span>
				</MenuItem>
			</Menu>
      {open && <BackDrop />}
		</React.Fragment>
	);
}
