import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import SpotifyDataFetcher from "../utils/SpotifyDataFetcher";
import CenterContainer from "../components/CenterContainer";

const Home = () => {
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();
    const { query } = router;

    useEffect(() => {
        const dataFetcher = new SpotifyDataFetcher();
        if (dataFetcher.hasLocalAccessToken()) {
            setIsAuth(true);
            return;
        }

        if (Object.hasOwn(query, "accessToken")) {
            dataFetcher.setLocalAccessToken(query.accessToken);
            if (Object.hasOwn(query, "refreshToken")) {
                dataFetcher.setLocalRefreshToken(query.refreshToken);
            }
            setIsAuth(true);
        }
    }, [query, router]);

    useEffect(() => {
        if (isAuth) {
            router.push("/profile");
        }
    }, [isAuth, router]);

    return (
        <CenterContainer>
            <Box>Spotify Profile</Box>
            <Button
                variant="contained"
                color="success"
                sx={{ borderRadius: "50px", padding: "10px 30px" }}
                onClick={() => router.push("/api/login")}
            >
                Log in to Spotify
            </Button>
        </CenterContainer>
    );
};

export default Home;
