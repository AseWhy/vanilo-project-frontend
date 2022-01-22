import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import AddButton from "../../common/AddButton";
import { usePageContext } from "../Page";


const validationSchema = yup.object({
    firstname: yup.string().required("Обязательно"),
    lastname: yup.string().required("Обязательно"),
    birthdate: yup.date().required("Обязательно")
});

export default function EditPeople() {
    const root = useRoot();
    const peoplesStore = root.Peoples;
    const context = usePageContext();
    const current = peoplesStore.getById(context.id);

    const formik = useFormik({
        initialValues: {
            firstname: current?.firstname ?? null,
            lastname: current?.lastname ?? null,
            birthdate: current?.birthdate ?? null
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(context.id == null) {
                peoplesStore.add(values);
            } else {
                peoplesStore.edit(context.id, values);
            }
        },
    });

    useEffect(() => {
        if(context.id != null) {
            peoplesStore.fetchByIds([ context.id ]);
        }
    }, [ context.id ]);

    return <Stack spacing={2}>
        <Typography variant="h5" component="h5"> Добавить человека </Typography>
        
        <Divider/>

        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={"auto"}>
                    <Stack spacing={2}>
                        <TextField
                            label="Имя"
                            name="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                            helperText={formik.touched.firstname && formik.errors.firstname}
                        />

                        <TextField
                            label="Фамилия"
                            name="lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                            helperText={formik.touched.lastname && formik.errors.lastname}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={"auto"}>
                    <Stack spacing={2}>
                        <TextField
                            label="Дата рождения"
                            name="birthdate"
                            type="date"
                            value={formik.values.birthdate}
                            onChange={formik.handleChange}
                            error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
                            helperText={formik.touched.birthdate && formik.errors.birthdate}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />

                        <AddButton/>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    </Stack>
}