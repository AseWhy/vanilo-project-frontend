import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { usePageContext } from "../Page";
import * as yup from 'yup';
import AddButton from "../../common/AddButton";

const validationSchema = yup.object({
    end_date: yup.date().required("Обязательно"),
});

export default function EditSemester() {
    const root = useRoot();
    const context = usePageContext();
    const semesterStore = root.Semester;
    const current = semesterStore.getById(context.id);

    const formik = useFormik({
        initialValues: {
            end_date: current?.end_date ?? null
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(context.id == null) {
                semesterStore.add(values);
            } else {
                semesterStore.edit(context.id, values);
            }
        },
    });

    useEffect(() => {
        if(context.id != null) {
            semesterStore.fetchByIds([ context.id ]);
        }
    }, [ context.id ]);

    return <Stack spacing={2}>
        <Typography variant="h5" component="h5"> Добавить семестер </Typography>
        
        <Divider/>
        
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={"auto"}>
                    <Stack spacing={2}>
                        <TextField
                            label="Дата завершения"
                            name="end_date"
                            type="date"
                            value={formik.values.end_date}
                            onChange={formik.handleChange}
                            error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                            helperText={formik.touched.end_date && formik.errors.end_date}
                            InputLabelProps={{
                                shrink: true
                            }}
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