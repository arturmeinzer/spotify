import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Anchor from "./UI/Anchor";

const AppLink = ({ href, as, children }) => (
    <Link href={href} as={as} passHref>
        <Anchor href="/replace">
            {children}
        </Anchor>
    </Link>
);

AppLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    as: PropTypes.string,
};

AppLink.defaultProps = {
    as: null,
};

export default AppLink;
