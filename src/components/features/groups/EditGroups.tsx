import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import AddButton from "../../common/AddButton";
import { usePageContext } from "../Page";
import PureAutocomplete from "../../common/PureAutocomplete";

const validationSchema = yup.object({
    speciality_id: yup.number().required("Обязательно"),
    name: yup.string().required("Обязательно")
});

export default function EditGroup() {
    const root = useRoot();
    const groupsStore = root.Groups;
    const specialityStore = groupsStore.specialityStore;
    const context = usePageContext();
    const current = groupsStore.getById(context.id);
    const pure = specialityStore.pure;

    const formik = useFormik({
        initialValues: {
            speciality_id: current?.speciality_id ?? null,
            name: current?.name ?? null
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(context.id == null) {
                groupsStore.add(values);
            } else {
                groupsStore.edit(context.id, values);
            }
        },
    });

    useEffect(() => {
        specialityStore.fetch();
    }, []);

    useEffect(() => {
        if(context.id != null) {
            groupsStore.fetchByIds([ context.id ]);
        }
    }, [ context.id ]);

    return <Stack spacing={2}>
        <Typography variant="h5" component="h5"> Добавить группу </Typography>
        
        <Divider/>

        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={"auto"}>
                    <Stack spacing={2}>
                        <PureAutocomplete
                            label={"Специальность"}
                            dataset={pure}
                            defaultValue={specialityStore.getById(formik.values.speciality_id)}
                            formik={formik}
                            property={"speciality_id"}
                        />

                        <TextField
                            label="Наименование"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={"auto"}>
                    <Stack spacing={2}>
                        <AddButton/>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    </Stack>
}