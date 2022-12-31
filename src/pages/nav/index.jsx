import React, { useState } from 'react'
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from '@mui/material'
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setMode, setLogout } from '../../state'
import FlexBetween from '../../components/FlexBetween'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography 
          fontWeight='bold' 
          fontSize="clamp(1rem, 2rem, 2.25rem)" 
          color="primary" onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: primaryLight
            },
          }}  
        >
          Socialbook
        </Typography>
        { isNonMobileScreen && (
          <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
            <InputBase placeholder="Search" startAdornment={<Search />} />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP */} 
      { isNonMobileScreen ? 
        (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {
                theme.palette.mode === 'dark' ?(
                    <DarkMode sx={{ fontSize: '25px'}} />
                  ):(
                    <LightMode sx={{ color: dark, fontSize:'25px'}} />
                  )
              }
            </IconButton>
            <Message sx={{ fontSize: '25px'}} />
            <Notifications sx={{ fontSize: '25px'}} />
            <Help sx={{ fontSize: '25px'}} />
            <FormControl variant='standard' value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: '150px',
                  borderRadius:'0.25rem',
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem"
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight
                  }
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName} onClick={() => navigate(`/profile/${user._id}`)}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem value="Logout" onClick={() => dispatch(setLogout())}>
                  <Typography>Logout</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) 
        : 
        (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE NAV */}
        { !isNonMobileScreen && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            minWidth="300px"
            maxWidth="500px"
            backgroundColor={background}
          >
            <Box display="flex" justifyContent="flex-end" padding="1rem">
              <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
              <IconButton onClick={() => dispatch(setMode())}>
                {
                  theme.palette.mode === 'dark' ?(
                      <DarkMode sx={{ fontSize: '25px'}} />
                    ):(
                      <LightMode sx={{ color: dark, fontSize:'25px'}} />
                    )
                }
              </IconButton>
              <Message sx={{ fontSize: '25px'}} />
              <Notifications sx={{ fontSize: '25px'}} />
              <Help sx={{ fontSize: '25px'}} />
              <FormControl variant='standard' value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: '150px',
                    borderRadius:'0.25rem',
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem"
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight
                    }
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem value="Logout" onClick={() => dispatch(setLogout())}></MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
    </FlexBetween>
  )
}

export default Navbar