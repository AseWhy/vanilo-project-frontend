import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { DataGrid } from '@mui/x-data-grid';
import Page, { pageContext } from "../Page";
import EditStudent from "./EditStudent";
import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import deleteButton from "../../common/deleteButton";

export default observer(() => {
    const root = useRoot();
    const studentsStore = root.Students;
    const raw = studentsStore.raw;

    useEffect(() => {
        studentsStore.fetch()
    }, [ studentsStore, studentsStore.page ]);

    return <Page>
        <pageContext.Consumer>
            {
                context => <Stack spacing={2}>
                    <EditStudent/>

                    <div style={{ height: 600, width: "100%" }}>
                        <DataGrid
                            rows={raw}
                            columns={
                                [
                                    deleteButton(studentsStore),
                                    { field: 'id', headerName: 'Код', type: 'number', width: 70 },
                                    { field: 'firstName', headerName: 'Имя', width: 130 },
                                    { field: 'lastName', headerName: 'Фамилия', width: 130 },
                                    { field: 'age', headerName: 'Возраст', type: 'number', width: 125, },
                                    { field: 'result', headerName: 'Средний бал', type: 'number', width: 125, },
                                    { field: 'passedSemestersCount', headerName: 'Семестр', type: 'number', width: 125 },
                                    { field: 'joinDate', headerName: 'Дата начала обучения', type: 'number', width: 225, },
                                    { field: 'leaveDate', headerName: 'Дата окончания обучения', type: 'number', width: 225, },
                                ]
                            }
                            onRowClick={row => context.setId(row.row.id)}
                            pageSize={10}
                            loading={studentsStore.loading}
                        />
                    </div>
                </Stack>
            }
        </pageContext.Consumer>
    </Page>
})