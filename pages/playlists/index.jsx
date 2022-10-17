import React from "react";
import BaseLayout from "../../components/BaseLayout";
import Header from "../../components/Header";
import withAuth from "../../hoc/withAuth";

const Playlists = () => (
    <BaseLayout>
        <Header title="Playlists" />
    </BaseLayout>
);

export default withAuth(Playlists);
