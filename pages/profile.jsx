import React from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FaUserCircle } from "react-icons/fa";
import SpotifyDataFetcher from "../utils/SpotifyDataFetcher";
import BaseLayout from "../layouts/BaseLayout";
import withAuth from "../hoc/withAuth";
import Artist from "../components/artist/Artist";
import { SIZE_SMALL } from "../constants/imageSizes";
import TrackItem from "../components/track/TrackItem";
import { useDataFetcher } from "../context/DataFetcherContext";
import ProfileSubHeader from "../components/profile/ProfileSubHeader";

const Profile = () => {
    const router = useRouter();
    const dataFetcher = useDataFetcher();
    const { data: profileData } = useQuery("profile", dataFetcher.getUserInfo);

    const onLogout = () => {
        SpotifyDataFetcher.logout();
        router.push("/");
    };

    return (
        <BaseLayout>
            <Stack gap={2} alignItems="center" sx={{ textAlign: "center", marginBottom: "50px" }}>
                <FaUserCircle fontSize={150} />
                <Box fontSize={50} fontWeight="bold">{profileData.user.display_name}</Box>
                <Button onClick={onLogout} color="warning">Logout</Button>
            </Stack>

            <Stack
                gap="20px"
                sx={{ flexDirection: { xs: "column", md: "row" } }}
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Stack gap={3} flex="50%">
                    <ProfileSubHeader href="/artists" title="Top Artists of All Time" />
                    {profileData.topArtists.items.map(
                        (artist) => <Artist key={artist.id} size={SIZE_SMALL} direction="row" artist={artist} />,
                    )}
                </Stack>
                <Stack gap={3} flex="50%">
                    <ProfileSubHeader href="/tracks" title="Top Tracks of All Time" />
                    {profileData.topTracks.items.map(
                        (track) => <TrackItem key={track.id} track={track} />,
                    )}
                </Stack>
            </Stack>
        </BaseLayout>
    );
};

export default withAuth(Profile);
