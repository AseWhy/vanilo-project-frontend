import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import AddButton from "../../common/AddButton";
import { usePageContext } from "../Page";


const validationSchema = yup.object({
    isced: yup.number().required("Обязательно"),
    duration: yup.number().required("Обязательно"),
    name: yup.string().required("Обязательно")
});

export default function EditSpeciality() {
    const root = useRoot();
    const specialityStore = root.Speciality;
    const context = usePageContext();
    const current = specialityStore.getById(context.id);

    const formik = useFormik({
        initialValues: {
            isced: current?.isced ?? null,
            duration: current?.duration ?? null,
            name: current?.name ?? null
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(context.id == null) {
                specialityStore.add(values);
            } else {
                specialityStore.edit(context.id, values);
            }
        },
    });

    useEffect(() => {
        if(context.id != null) {
            specialityStore.fetchByIds([ context.id ]);
        }
    }, [ context.id ]);

    return <Stack spacing={2}>
        <Typography variant="h5" component="h5"> Добавить специальность </Typography>
        
        <Divider/>

        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={"auto"}>
                    <Stack spacing={2}>
                        <TextField
                            label="Код программы МСКО (2013)"
                            name="isced"
                            type="number"
                            value={formik.values.isced}
                            onChange={formik.handleChange}
                            error={formik.touched.isced && Boolean(formik.errors.isced)}
                            helperText={formik.touched.isced && formik.errors.isced}
                        />

                        <TextField
                            label="Длительность (семестров)"
                            name="duration"
                            type="number"
                            value={formik.values.duration}
                            onChange={formik.handleChange}
                            error={formik.touched.duration && Boolean(formik.errors.duration)}
                            helperText={formik.touched.duration && formik.errors.duration}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={"auto"}>
                    <Stack spacing={2}>
                        <TextField
                            label="Наименование"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />

                        <AddButton/>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    </Stack>
}