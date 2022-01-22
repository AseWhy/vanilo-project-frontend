import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import PureAutocomplete from "../../common/PureAutocomplete";
import { usePageContext } from "../Page";
import * as yup from 'yup';
import AddButton from "../../common/AddButton";

const validationSchema = yup.object({
    teacher_id: yup.number().required("Обязательно"),
    name: yup.string().required("Обязательно")
});

export default function EditThing() {
    const root = useRoot();
    const context = usePageContext();
    const thingsStore = root.Things;
    const teacherStore = thingsStore.teacherStore;
    const current = thingsStore.getById(context.id);

    const formik = useFormik({
        initialValues: {
            teacher_id: current?.teacher_id ?? null,
            name: current?.name ?? null
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(context.id == null) {
                thingsStore.add(values);
            } else {
                thingsStore.edit(context.id, values);
            }
        },
    });

    useEffect(() => {
        teacherStore.fetch();
    }, []);

    useEffect(() => {
        if(context.id != null) {
            thingsStore.fetchByIds([ context.id ]);
        }
    }, [ context.id ]);

    return <Stack spacing={2}>
        <Typography variant="h5" component="h5"> Добавить предмет </Typography>
        
        <Divider/>
        
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={"auto"}>
                    <Stack spacing={2}>
                        <PureAutocomplete
                            label={"Преподаватель"}
                            dataset={teacherStore.pure}
                            defaultValue={teacherStore.getById(formik.values.teacher_id)}
                            formik={formik}
                            property={"teacher_id"}
                        />

                        <TextField
                            label="Название предмета"
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
    </Stack>;
}