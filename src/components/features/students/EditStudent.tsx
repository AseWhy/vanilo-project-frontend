import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import PureAutocomplete from "../../common/PureAutocomplete";
import { usePageContext } from "../Page";
import * as yup from 'yup';
import AddButton from "../../common/AddButton";

const validationSchema = yup.object({
    people_id: yup.number().required("Обязательно"),
    group_id: yup.number().required("Обязательно"),
    join_date: yup.date().required("Обязательно"),
    leave_date: yup.date().nullable()
});

export default function EditStudent() {
    const root = useRoot();
    const context = usePageContext();
    const studentsStore = root.Students;
    const peoplesStore = studentsStore.peopleStore;
    const groupStore = studentsStore.groupsStore;
    const current = studentsStore.getById(context.id);

    const formik = useFormik({
        initialValues: {
            people_id: current?.people_id ?? null,
            group_id: current?.group_id ?? null,
            join_date: current?.join_date ?? null,
            leave_date: current?.leave_date ?? null,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(context.id == null) {
                studentsStore.add(values);
            } else {
                studentsStore.edit(context.id, values);
            }
        },
    });

    useEffect(() => {
        groupStore.fetch();
        peoplesStore.fetch();
    }, []);

    useEffect(() => {
        if(context.id != null) {
            studentsStore.fetchByIds([ context.id ]);
        }
    }, [ context.id ]);

    return <Stack spacing={2}>
        <Typography variant="h5" component="h5"> Добавить студента </Typography>
        
        <Divider/>
        
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={"auto"}>
                    <Stack spacing={2}>
                        <PureAutocomplete
                            label={"Группа"}
                            dataset={groupStore.pure}
                            defaultValue={groupStore.getById(formik.values.group_id)}
                            formik={formik}
                            property={"group_id"}
                        />

                        <PureAutocomplete
                            label={"Человек"}
                            dataset={peoplesStore.pure}
                            defaultValue={peoplesStore.getById(formik.values.people_id)}
                            formik={formik}
                            property={"people_id"}
                        />
                    </Stack>
                </Grid>


                <Grid item xs={"auto"}>
                    <Stack spacing={2}>
                        <TextField
                            label="Дата начала обучения"
                            name="join_date"
                            type="date"
                            value={formik.values.join_date}
                            onChange={formik.handleChange}
                            error={formik.touched.join_date && Boolean(formik.errors.join_date)}
                            helperText={formik.touched.join_date && formik.errors.join_date}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />

                        <TextField
                            label="Дата окончания обучения"
                            name="leave_date"
                            type="date"
                            value={formik.values.leave_date}
                            onChange={formik.handleChange}
                            error={formik.touched.leave_date && Boolean(formik.errors.leave_date)}
                            helperText={formik.touched.leave_date && formik.errors.leave_date}
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