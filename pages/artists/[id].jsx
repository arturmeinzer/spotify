import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import BaseLayout from "../../components/BaseLayout";
import SpotifyDataFetcher from "../../utils/SpotifyDataFetcher";

const GreenBox = styled(Box)({
    color: "green",
    fontWeight: "bold",
});

const Header = styled(Box)({
    color: "#aaa",
    fontSize: "12px",
    marginBottom: "5px",
});

const HEIGHT = 300;
const WIDTH = 300;

const ArtistDetail = () => {
    const shouldFetch = useRef(true);
    const [artist, setArtist] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    const findBestImage = useCallback((imagesArray) => {
        let bestImage = imagesArray[0];
        imagesArray.forEach((image) => {
            if (image.height >= HEIGHT && image.width >= WIDTH) {
                bestImage = image;
            }
        });
        return bestImage.url;
    }, []);

    useEffect(() => {
        if (shouldFetch.current && typeof id !== "undefined") {
            shouldFetch.current = false;
            const dataFetcher = new SpotifyDataFetcher();
            dataFetcher.getArtist(id).then((response) => {
                setArtist(response.data);
                shouldFetch.current = true;
            });
        }
    }, [id]);

    if (!artist) {
        return (
            <BaseLayout>
                Loading...
            </BaseLayout>
        );
    }

    return (
        <BaseLayout>
            <Container>
                <Stack justifyContent="center" alignItems="center" gap={5}>
                    <Typography variant="h2" as="h1" fontWeight="bold">{artist.name}</Typography>
                    <Box>
                        <Image
                            src={findBestImage(artist.images)}
                            width={WIDTH}
                            height={HEIGHT}
                            style={{ borderRadius: "50%" }}
                        />
                    </Box>
                    <Stack
                        flexDirection="row"
                        justifyContent="space-between"
                        textAlign="center"
                        width="500px"
                        sx={{ textTransform: "uppercase" }}
                    >
                        <Box>
                            <Header>Followers</Header>
                            <GreenBox>{artist.followers.total}</GreenBox>
                        </Box>
                        <Box>
                            <Header>Genres</Header>
                            {artist.genres.map((genre) => <GreenBox>{genre}</GreenBox>)}
                        </Box>
                        <Box>
                            <Header>Popularity</Header>
                            <GreenBox>{`${artist.popularity} %`}</GreenBox>
                        </Box>
                    </Stack>
                </Stack>
            </Container>
        </BaseLayout>
    );
};

export default ArtistDetail;
