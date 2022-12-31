import { Link, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const SponsorWidget = () => {

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography variant="h5" color={dark}>Sponsored</Typography>
            </FlexBetween>
            <img
                width="100%"
                height="auto"
                alt="sponsor"
                src="http://localhost:3001/assets/sponsor.png"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            />
            <FlexBetween>
                <Box>
                    <Typography color={main}>Salman Ibrahim</Typography>
                    <Link sx={{cursor:'pointer'}} color={medium} href="https://salman-ibrahim.github.io" target="_blank">salman-ibrahim.github.io</Link>
                </Box>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                This project is built with React, Redux, Node.js, Express, MongoDB, and Material-UI.
            </Typography>
        </WidgetWrapper>
    )
}

export default SponsorWidget;