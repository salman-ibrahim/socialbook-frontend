import { EditOutlined, DeleteOutline, AttachFileOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined} from "@mui/icons-material";
import { Box, Divider, Typography, useTheme, InputBase, Button, IconButton, useMediaQuery } from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import UserImage from "../../components/UserImage";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../state";

const CreatePostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState('');
    const { palette } = useTheme();
    const { _id } = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append('userId', _id);
        if(post) {
            formData.append('description', post);
        }
        if(image) {
            formData.append('picture', image);
            formData.append('picturePath', image.name);
        }

        const response = await fetch(`https://socialbook-api.netlify.app/posts`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
        const posts = await response.json();
        dispatch(setPosts({ posts }));

        // Reset post states
        setIsImage(false);
        setImage(null);
        setPost('');
    }

    return (
        <WidgetWrapper>
            <FlexBetween gap='1.5rem'>
                <UserImage image={picturePath} size={40} />
                <InputBase 
                    placeholder="What's happening?"
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width:'100%',
                        backgroundColor: palette.neutral.light,
                        borderRadius: '0.5rem',
                        padding: '1rem 2rem',
                        overflowWrap: 'break-word',
                    }}
                    multiline
                    maxRows={4}
                />
            </FlexBetween>
            { isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius='5px'
                    mt='1rem'
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg, .jpeg, .png"
                        multiple={false}
                        onDrop={(acceptedFiles) => {
                            setImage(acceptedFiles[0]);
                        }}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    p="1rem"
                                    width='100%'
                                    border={`2px dashed ${palette.neutral.main}`}
                                    sx={{
                                        "&:hover": { cursor: "pointer" },
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    { !image ? (
                                        <p>Click or Drop Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                { image && (
                                    <IconButton
                                        onClick={() => {setImage(null); setIsImage(false)}}
                                        sx={{width: '15%'}}
                                    >
                                        <DeleteOutline />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />
                                    
            <FlexBetween>
                <FlexBetween gap='0.25rem' onClick={() => setIsImage(!isImage)} style={{cursor:'pointer'}}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        sx={{ "&hover": { cursor: 'pointer', color: medium} }} 
                    >
                        Image
                    </Typography>
                </FlexBetween>

                { isNonMobileScreen ? (
                    <>
                        <FlexBetween style={{ cursor: 'not-allowed' }}>
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>GIF</Typography>
                        </FlexBetween>

                        <FlexBetween style={{ cursor: 'not-allowed' }}>
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetween>

                        <FlexBetween style={{ cursor: 'not-allowed' }}>
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>
                    ) : (
                        <FlexBetween gap='0.25rem'>
                            <MoreHorizOutlined sx={{ color: mediumMain }} />
                        </FlexBetween>
                    )
                }

                <Button
                    disabled={!post && !image}    
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius:'3rem'
                    }}
                >
                    Post
                </Button>
            </FlexBetween>
        </WidgetWrapper>
    )
};

export default CreatePostWidget;