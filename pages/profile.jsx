import React, { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { FaUserCircle } from "react-icons/fa";
import SpotifyDataFetcher from "../utils/SpotifyDataFetcher";
import BaseLayout from "../components/BaseLayout";
import withAuth from "../hoc/withAuth";
import Artist from "../components/Artist";
import { SIZE_SMALL } from "../constants/imageSizes";
import TrackItem from "../components/TrackItem";
import AppLink from "../components/AppLink";
import Loader from "../components/Loader";

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const shouldFetch = useRef(true);
    const router = useRouter();

    useEffect(() => {
        if (shouldFetch.current) {
            shouldFetch.current = false;
            const dataFetcher = new SpotifyDataFetcher();
            dataFetcher.getUserInfo().then((response) => {
                // eslint-disable-next-line no-console
                console.log(response);
                const { user, topArtists, topTracks } = response;
                setProfileData({
                    user,
                    topArtists,
                    topTracks,
                });
            });
        }
    }, []);

    const onLogout = () => {
        SpotifyDataFetcher.logout();
        router.push("/");
    };

    if (profileData === null) {
        return (
            <BaseLayout>
                <Loader />
            </BaseLayout>
        );
    }

    return (
        <BaseLayout>
            <Stack gap={2} alignItems="center" sx={{ textAlign: "center", marginBottom: "50px" }}>
                <FaUserCircle fontSize={150} />
                <Box fontSize={50} fontWeight="bold">{profileData.user.display_name}</Box>
                <Button onClick={onLogout} color="warning">Logout</Button>
            </Stack>

            <Stack gap="20px" sx={{ flexDirection: { xs: "column", md: "row" } }}>
                <Stack gap={3} flex="50%">
                    <Stack direction="row" gap={5}>
                        <Typography variant="h6" as="h2" fontWeight="bold">Top Artists of All Time</Typography>
                        <AppLink href="/artists">
                            <Button color="success">See More</Button>
                        </AppLink>
                    </Stack>
                    {profileData.topArtists.items.map(
                        (artist) => <Artist key={artist.id} size={SIZE_SMALL} direction="row" artist={artist} />,
                    )}
                </Stack>
                <Stack gap={3} flex="50%">
                    <Stack direction="row" gap={5}>
                        <Typography variant="h6" as="h2" fontWeight="bold">Top Tracks of All Time</Typography>
                        <AppLink href="/tracks">
                            <Button color="success">See More</Button>
                        </AppLink>
                    </Stack>
                    {profileData.topTracks.items.map(
                        (track) => <TrackItem key={track.id} track={track} />,
                    )}
                </Stack>
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(Profile);
