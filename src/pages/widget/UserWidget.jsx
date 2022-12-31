import { ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined, InfoOutlined  } from "@mui/icons-material";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Twitter, LinkedIn } from "@mui/icons-material";
const UserWidget = ({userId, picturePath}) => {
    const [user, setUser] = useState(null);
    const [isMyOwnProfile, setIsMyOwnProfile] = useState(false);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector(state => state.token);
    const authUserId = useSelector(state => state.user._id);
    const friendsCount = useSelector(state => state.user.friends.length);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const res = await fetch(`http://localhost:3001/users/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await res.json();
        setIsMyOwnProfile(authUserId === userId);
        setUser(data);
    }
        
    useEffect(() => {
        getUser();
    }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps 

    if (!user) return null;

    const { firstName, lastName, location, occupation, viewedProfile, impressions, friends, bio } = user;
    
    return (
        <WidgetWrapper>
            <FlexBetween
                gap={'0.5rem'}
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                {/* MAIN INFO */}
                <FlexBetween gap='1rem' alignItems="center">
                    <UserImage image={picturePath} />
                    <Box ml={2}>
                        <Typography 
                            variant="h4" 
                            color={dark} 
                            fontWeight='500'
                            sx={{
                                '&:hover': {
                                    color: palette.primary.light,
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>{ isMyOwnProfile ? friendsCount : friends.length} friends</Typography>
                    </Box>
                </FlexBetween>
                { isMyOwnProfile && <ManageAccountsOutlined/> }
                </FlexBetween>
                <Divider/>

                {/* ABOUT */}
                <Box p='1rem 0'>
                    <Box display='flex' alignItems='center' gap='1rem' mb="0.5rem">
                        <LocationOnOutlined fontSize="large" sx={{ color: main}} />
                        <Typography color={medium}>{location}</Typography>
                    </Box>

                    <Box display='flex' alignItems='center' gap='1rem' mb="0.5rem">
                        <WorkOutlineOutlined fontSize="large" sx={{ color: main}} />
                        <Typography color={medium}>{occupation}</Typography>
                    </Box>

                    <Box display='flex'  gap='1rem'>
                        <InfoOutlined fontSize="large" sx={{ color: main}} />
                        <Box>
                        <Typography color={main}>About</Typography>
                        <Typography color={medium}>{bio}</Typography>
                        </Box>
                    </Box>
                </Box>
                
                <Divider />

                {/* STATS */}
                <Box p='1rem 0'>
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>Profile views</Typography>
                        <Typography color={main} fontWeight="500">{viewedProfile}</Typography>
                    </FlexBetween>

                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>Impressions generated</Typography>
                        <Typography color={main} fontWeight="500">{impressions}</Typography>
                    </FlexBetween>
                </Box>

                <Divider />

                {/* SOCIAL */}
                <Box p='1rem 0'>
                    <Typography color={main} fontSize="1rem" fontWeight="500" mb="0.5rem">
                        Social Profiles
                    </Typography>
                    <FlexBetween gap='1rem' mb="0.5rem">
                        <FlexBetween gap='1rem'>
                            <Twitter />
                            <Box>
                                <Typography color={main} fontWeight="500">Twitter</Typography>
                                <Typography color={medium}>Social Netwrok</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{ color: main}} />
                    </FlexBetween>

                    <FlexBetween gap='1rem' mb="0.5rem">
                        <FlexBetween gap='1rem'>
                            <LinkedIn />
                            <Box>
                                <Typography color={main} fontWeight="500">Linkedin</Typography>
                                <Typography color={medium}>Netwrok Platform</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{ color: main}} />
                    </FlexBetween>
                </Box>
        </WidgetWrapper>
    )
}

export default UserWidget;