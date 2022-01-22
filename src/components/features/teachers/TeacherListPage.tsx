import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { DataGrid } from '@mui/x-data-grid';
import Page, { pageContext } from "../Page";
import EditTeacher from "./EditTeacher";
import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import deleteButton from "../../common/deleteButton";

export default observer(() => {
    const root = useRoot();
    const teachersStore = root.Teacher;
    const raw = teachersStore.raw;

    useEffect(() => {
        teachersStore.fetch()
    }, [ teachersStore, teachersStore.page ]);

    return <Page>
        <pageContext.Consumer>
            {
                context => <Stack spacing={2}>
                    <EditTeacher/>

                    <div style={{ height: 600, width: "100%" }}>
                        <DataGrid
                            rows={raw}
                            columns={
                                [
                                    deleteButton(teachersStore),
                                    { field: 'id', headerName: 'Код', type: 'number', width: 70 },
                                    { field: 'firstName', headerName: 'Имя', width: 130 },
                                    { field: 'lastName', headerName: 'Фамилия', width: 130 },
                                    { field: 'age', headerName: 'Возраст', type: 'number', width: 125, }
                                ]
                            }
                            onRowClick={row => context.setId(row.row.id)}
                            pageSize={10}
                            loading={teachersStore.loading}
                        />
                    </div>
                </Stack>
            }
        </pageContext.Consumer>
    </Page>
})