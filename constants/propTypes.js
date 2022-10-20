import PropTypes from "prop-types";

export const PROP_TYPE_IMAGES = PropTypes.arrayOf(PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    url: PropTypes.string,
}));

export const PROP_TYPE_ARTIST = PropTypes.shape({
    href: PropTypes.string,
    images: PROP_TYPE_IMAGES,
    name: PropTypes.string,
    id: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    followers: PropTypes.shape({
        href: PropTypes.string,
        total: PropTypes.number,
    }),
    popularity: PropTypes.number,
});

export const PROP_TYPE_TRACK = PropTypes.shape({
    album: PropTypes.shape({
        name: PropTypes.string,
        images: PROP_TYPE_IMAGES,
        release_date: PropTypes.string,
    }),
    artists: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
    })),
    name: PropTypes.string,
    id: PropTypes.string,
    popularity: PropTypes.number,
    preview_url: PropTypes.string,
    href: PropTypes.string,
    duration_ms: PropTypes.number,
    uri: PropTypes.string,
});

export const PROP_TYPES_ANALYSIS = PropTypes.shape({
    start: PropTypes.number,
    duration: PropTypes.number,
});

export const PROP_TYPES_PLAYLIST = PropTypes.shape({
    id: PropTypes.string,
    images: PROP_TYPE_IMAGES,
    name: PropTypes.string,
    snapshot_id: PropTypes.string,
    tracks: PropTypes.shape({
        href: PropTypes.string,
        total: PropTypes.number,
    }),
});
