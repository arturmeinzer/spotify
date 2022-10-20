import React, {
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BaseLayout from "../../layouts/BaseLayout";
import withAuth from "../../hoc/withAuth";
import DataContext from "../../context/DataContext";
import Image from "../../components/Image";
import { SIZE_MEDIUM } from "../../constants/imageSizes";
import { releaseDateToYear } from "../../utils/TimeConverter";
import AudioAnalysis from "../../components/AudioAnalysis";
import PlaylistModal from "../../components/PlaylistModal";

const TrackDetails = () => {
    const shouldFetch = useRef(true);
    const [data, setData] = useState(null);
    const [openModal, setOpenModal] = useState(true);
    const dataFetcher = useContext(DataContext);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (shouldFetch.current && typeof id !== "undefined") {
            shouldFetch.current = false;
            dataFetcher.getTrackInfo(id).then((response) => {
                setData({
                    track: response.track,
                    audioAnalysis: response.audioAnalysis,
                });
            });
        }

        return () => {
            shouldFetch.current = true;
        };
    }, [id, dataFetcher]);

    return (
        <BaseLayout loading={data === null}>
            {data && (
                <Stack gap={3}>
                    <Stack
                        gap={3}
                        alignItems="center"
                        sx={{ flexDirection: { xs: "column", md: "row" }, textAlign: { xs: "center", md: "left" } }}
                    >
                        <Box>
                            <Image imagesArray={data.track.album.images} size={SIZE_MEDIUM} />
                        </Box>
                        <Stack gap={2}>
                            <Typography variant="h3" as="h1">{data.track.name}</Typography>
                            <Box sx={{ color: (theme) => theme.palette.text.secondary }}>
                                {data.track.artists.map((artist) => artist.name).join(", ")}
                            </Box>
                            <Box sx={{ color: (theme) => theme.palette.text.secondary }}>
                                {`${data.track.album.name} - ${releaseDateToYear(data.track.album.release_date)}`}
                            </Box>
                        </Stack>
                    </Stack>
                    <Stack flexDirection="row">
                        <Button color="success" onClick={() => setOpenModal(true)}>Add To Playlist</Button>
                        <PlaylistModal
                            open={openModal}
                            setOpen={setOpenModal}
                            uri={data.track.uri}
                        />
                    </Stack>
                    <AudioAnalysis audioAnalysis={data.audioAnalysis} />
                </Stack>
            )}
        </BaseLayout>
    );
};

export default withAuth(TrackDetails);
