import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import PureAutocomplete from "../../common/PureAutocomplete";
import { usePageContext } from "../Page";
import * as yup from 'yup';
import AddButton from "../../common/AddButton";

const validationSchema = yup.object({
    thing_id: yup.number().required("Обязательно"),
    semester_id: yup.number().required("Обязательно"),
    student_id: yup.number().required("Обязательно"),
    result: yup.string().required("Обязательно")
});

export default function EditStatement() {
    const root = useRoot();
    const context = usePageContext();
    const statementsStore = root.Statement;
    const semestersStore = statementsStore.semestersStoreCast;
    const thingsStore = statementsStore.thingsStoreCast;
    const studentsStore = statementsStore.studentsStoreCast;
    const current = statementsStore.getById(context.id);

    const formik = useFormik({
        initialValues: {
            thing_id: current?.thing_id ?? null,
            semester_id: current?.semester_id ?? null,
            student_id: current?.student_id ?? null,
            result: current?.result ?? null,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(context.id == null) {
                statementsStore.add(values);
            } else {
                statementsStore.edit(context.id, values);
            }
        },
    });

    useEffect(() => {
        thingsStore.fetch();
        semestersStore.fetch();
        studentsStore.fetch();
    }, []);

    useEffect(() => {
        if(context.id != null) {
            statementsStore.fetchByIds([ context.id ]);
        }
    }, [ context.id ]);

    return <Stack spacing={2}>
        <Typography variant="h5" component="h5"> Добавить отчет </Typography>
        
        <Divider/>
        
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={"auto"}>
                    <Stack spacing={2}>
                        <PureAutocomplete
                            label={"Предмет"}
                            dataset={thingsStore.pure}
                            defaultValue={thingsStore.getById(formik.values.thing_id)}
                            formik={formik}
                            property={"thing_id"}
                        />

                        <PureAutocomplete
                            label={"Семестер"}
                            dataset={semestersStore.pure}
                            defaultValue={semestersStore.getById(formik.values.semester_id)}
                            formik={formik}
                            property={"semester_id"}
                        />
                    </Stack>
                </Grid>


                <Grid item xs={"auto"}>
                    <Stack spacing={2}>
                        <PureAutocomplete
                            label={"Студент"}
                            dataset={studentsStore.pure}
                            defaultValue={studentsStore.getById(formik.values.student_id)}
                            formik={formik}
                            property={"student_id"}
                        />

                        <TextField
                            label="Оценка"
                            name="result"
                            type="number"
                            value={formik.values.result}
                            onChange={formik.handleChange}
                            error={formik.touched.result && Boolean(formik.errors.result)}
                            helperText={formik.touched.result && formik.errors.result}
                        />
                    </Stack>
                </Grid>

                <Grid item xs={"auto"}>
                    <AddButton/>
                </Grid>
            </Grid>
        </form>
    </Stack>;
}