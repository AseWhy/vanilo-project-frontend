import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { DataGrid } from '@mui/x-data-grid';
import Page, { pageContext } from "../Page";
import EditPeople from "./EditPeople";
import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import deleteButton from "../../common/deleteButton";

export default observer(() => {
    const root = useRoot();
    const peoplesStore = root.Peoples;
    const raw = peoplesStore.raw;

    useEffect(() => {
        peoplesStore.fetch()
    }, [ peoplesStore, peoplesStore.page ]);

    return <Page>
        <pageContext.Consumer>
            {
                context => <Stack spacing={2}>
                    <EditPeople/>
        
                    <div style={{ height: 600, width: "100%" }}>
                        <DataGrid
                            rows={raw}
                            columns={
                                [
                                    deleteButton(peoplesStore),
                                    { field: 'id', headerName: 'Код', type: 'number', width: 70 },
                                    { field: 'firstname', headerName: 'Имя', width: 160 },
                                    { field: 'lastname', headerName: 'Фамилия', width: 160 },
                                    { field: 'birthdate', headerName: 'Дата рождения', width: 130 }
                                ]
                            }
                            onRowClick={row => context.setId(row.row.id)}
                            pageSize={10}
                            loading={peoplesStore.loading}
                        />
                    </div>
                </Stack>
            }
        </pageContext.Consumer>
    </Page>
});