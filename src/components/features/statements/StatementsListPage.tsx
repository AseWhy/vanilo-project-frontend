import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { DataGrid } from '@mui/x-data-grid';
import Page, { pageContext } from "../Page";
import EditStatement from "./EditStatement";
import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import deleteButton from "../../common/deleteButton";

export default observer(() => {
    const root = useRoot();
    const statementsStore = root.Statement;
    const raw = statementsStore.raw;

    useEffect(() => {
        statementsStore.fetch()
    }, [ statementsStore, statementsStore.page ]);

    return <Page>
        <pageContext.Consumer>
            {
                context => <Stack spacing={2}>
                    <EditStatement/>

                    <div style={{ height: 600, width: "100%" }}>
                        <DataGrid
                            rows={raw}
                            columns={
                                [
                                    deleteButton(statementsStore),
                                    { field: 'id', headerName: 'Код', type: 'number', width: 70 },
                                    { field: 'teacherFullname', headerName: 'Преподаватель', width: 250 },
                                    { field: 'thingName', headerName: 'Название предмета', width: 250 },
                                    { field: 'result', headerName: 'Оценка', type: 'number', width: 150 },
                                ]
                            }
                            onRowClick={row => context.setId(row.row.id)}
                            pageSize={10}
                            loading={statementsStore.loading}
                        />
                    </div>
                </Stack>
            }
        </pageContext.Consumer>
    </Page>
})