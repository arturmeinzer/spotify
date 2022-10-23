import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import CenterContainer from "../components/UI/CenterContainer";
import Loader from "../components/shared/Loader";
import DataFetcherContext from "../context/DataFetcherContext";

const Home = () => {
    const [isAuth, setIsAuth] = useState(false);
    const dataFetcher = useContext(DataFetcherContext);
    const router = useRouter();
    const { query } = router;

    useEffect(() => {
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
    }, [query, router, dataFetcher]);

    useEffect(() => {
        if (isAuth) {
            router.push("/profile");
        }
    }, [isAuth, router]);

    if (isAuth) {
        return <Loader />;
    }

    return (
        <CenterContainer>
            <Box>Spotify Profile</Box>
            <Button
                color="success"
                onClick={() => router.push("/api/login")}
            >
                Login to Spotify
            </Button>
        </CenterContainer>
    );
};

export default Home;
