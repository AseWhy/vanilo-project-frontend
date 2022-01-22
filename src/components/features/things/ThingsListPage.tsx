import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { DataGrid } from '@mui/x-data-grid';
import Page, { pageContext } from "../Page";
import EditThing from "./EditThing";
import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import deleteButton from "../../common/deleteButton";

export default observer(() => {
    const root = useRoot();
    const thingsStore = root.Things;
    const raw = thingsStore.raw;

    useEffect(() => {
        thingsStore.fetch()
    }, [ thingsStore, thingsStore.page ]);

    return <Page>
        <pageContext.Consumer>
            {
                context => <Stack spacing={2}>
                    <EditThing/>

                    <div style={{ height: 600, width: "100%" }}>
                        <DataGrid
                            rows={raw}
                            columns={
                                [
                                    deleteButton(thingsStore),
                                    { field: 'id', headerName: 'Код', type: 'number', width: 70 },
                                    { field: 'name', headerName: 'Название предмета', width: 250 },
                                    { field: 'teacherFullname', headerName: 'Преподаватель', width: 250 }
                                ]
                            }
                            onRowClick={row => context.setId(row.row.id)}
                            pageSize={10}
                            loading={thingsStore.loading}
                        />
                    </div>
                </Stack>
            }
        </pageContext.Consumer>
    </Page>
})