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
