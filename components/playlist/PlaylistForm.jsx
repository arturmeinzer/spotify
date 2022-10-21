import React from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const PlaylistForm = ({ onSubmit, initialData }) => {
    const { register, handleSubmit } = useForm({ defaultValues: initialData });

    return (
        <Container sx={{ maxWidth: "400px !important" }}>
            <Stack justifyContent="center" gap={3}>
                <FormControl>
                    <InputLabel>Name</InputLabel>
                    <OutlinedInput
                        label="Name"
                        {...register("name")}
                        autoFocus
                    />
                </FormControl>
                <FormControl>
                    <InputLabel>Description</InputLabel>
                    <OutlinedInput
                        label="Description"
                        {...register("description")}
                    />
                </FormControl>
                <Button color="success" onClick={handleSubmit(onSubmit)}>Save</Button>
            </Stack>
        </Container>
    );
};

PlaylistForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
    }),
};

PlaylistForm.defaultProps = {
    initialData: {
        name: "",
        description: "",
    },
};

export default PlaylistForm;
