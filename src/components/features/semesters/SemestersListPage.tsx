import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { DataGrid } from '@mui/x-data-grid';
import Page, { pageContext } from "../Page";
import EditSemester from "./EditSemesters";
import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import deleteButton from "../../common/deleteButton";

export default observer(() => {
    const root = useRoot();
    const semesterStore = root.Semester;
    const raw = semesterStore.raw;

    useEffect(() => {
        semesterStore.fetch()
    }, [ semesterStore, semesterStore.page ]);

    return <Page>
        <pageContext.Consumer>
            {
                context => <Stack spacing={2}>
                    <EditSemester/>

                    <div style={{ height: 600, width: "100%" }}>
                        <DataGrid
                            rows={raw}
                            columns={
                                [
                                    deleteButton(semesterStore),
                                    { field: 'id', headerName: 'Код', type: 'number', width: 70 },
                                    { field: 'end_date', headerName: 'Дата завершения', type: 'number', width: 150 },
                                ]
                            }
                            onRowClick={row => context.setId(row.row.id)}
                            pageSize={10}
                            loading={semesterStore.loading}
                        />
                    </div>
                </Stack>
            }
        </pageContext.Consumer>
    </Page>
})