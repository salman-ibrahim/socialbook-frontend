import { Box, useMediaQuery } from "@mui/material" 
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../nav";
import FriendListWidget from "../widget/FriendListWidget";
import CreatePostWidget from "../widget/CreatePostWidget";
import PostsWidget from "../widget/PostsWidget";
import UserWidget from "../widget/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [isMyOwnProfile, setIsMyOwnProfile] = useState(false)

  const { userId } = useParams()
  const token = useSelector(state => state.token);
  const authUserId = useSelector(state => state.user._id);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

  const getUser = async () => {
    const response = await fetch(`https://socialbook-api.netlify.app/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const user = await response.json();
    setIsMyOwnProfile(authUserId === userId);
    setUser(user);
  }

  useEffect(() => {
    getUser();
  }, [userId])

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box
            m="2rem 0"
          >
            <FriendListWidget userId={userId} />
          </Box>
        </Box>

        <Box 
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          { isMyOwnProfile 
            &&
            <>
            <CreatePostWidget picturePath={user.picturePath} /> 
            <Box m="2rem 0" />
            </>
          }
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage