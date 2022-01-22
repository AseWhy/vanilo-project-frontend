import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { Divider, Grid, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import PureAutocomplete from "../../common/PureAutocomplete";
import { usePageContext } from "../Page";
import * as yup from 'yup';
import AddButton from "../../common/AddButton";

const validationSchema = yup.object({
    people_id: yup.number().required("Обязательно")
});

export default function EditTeacher() {
    const root = useRoot();
    const context = usePageContext();
    const teachersStore = root.Teacher;
    const peoplesStore = teachersStore.peopleStore;
    const current = teachersStore.getById(context.id);

    const formik = useFormik({
        initialValues: {
            people_id: current?.people_id ?? null
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(context.id == null) {
                teachersStore.add(values);
            } else {
                teachersStore.edit(context.id, values);
            }
        },
    });

    useEffect(() => {
        peoplesStore.fetch();
    }, []);

    useEffect(() => {
        if(context.id != null) {
            teachersStore.fetchByIds([ context.id ]);
        }
    }, [ context.id ]);

    return <Stack spacing={2}>
        <Typography variant="h5" component="h5"> Добавить преподавателя </Typography>
        
        <Divider/>
        
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={"auto"}>
                    <Stack spacing={2}>
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
                        <AddButton/>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    </Stack>;
}