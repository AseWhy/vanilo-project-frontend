import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { DataGrid } from '@mui/x-data-grid';
import Page, { pageContext } from "../Page";
import EditGroup from "./EditGroups";
import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import deleteButton from "../../common/deleteButton";

export default observer(() => {
    const root = useRoot();
    const groupsStore = root.Groups;
    const raw = groupsStore.raw;

    useEffect(() => {
        groupsStore.fetch()
    }, [groupsStore, groupsStore.page]);

    return <Page>
        <pageContext.Consumer>
            {
                context => <Stack spacing={2}>
                    <EditGroup/>

                    <div style={{ height: 600, width: "100%" }}>
                        <DataGrid
                            rows={raw}
                            columns={
                                [
                                    deleteButton(groupsStore),
                                    { field: 'id', headerName: 'Код', type: 'number', width: 70 },
                                    { field: 'specialityName', headerName: 'Название спецаильности', width: 500 },
                                    { field: 'name', headerName: 'Название группы', width: 500 }
                                ]
                            }
                            onRowClick={row => context.setId(row.row.id)}
                            pageSize={10}
                            loading={groupsStore.loading}
                        />
                    </div>
                </Stack>
            }
        </pageContext.Consumer>
    </Page>
});