import { useEffect } from "react";
import { useRoot } from "../../../config/hooks";
import { DataGrid } from '@mui/x-data-grid';
import Page, { pageContext } from "../Page";
import EditSpeciality from "./EditSpeciality";
import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import deleteButton from "../../common/deleteButton";

export default observer(() => {
    const root = useRoot();
    const specialityStore = root.Speciality;
    const raw = specialityStore.raw;

    useEffect(() => {
        specialityStore.fetch()
    }, [ specialityStore, specialityStore.page ]);

    return <Page>
        <pageContext.Consumer>
            {
                context => <Stack spacing={2}>
                    <EditSpeciality/>
        
                    <div style={{ height: 600, width: "100%" }}>
                        <DataGrid
                            rows={raw}
                            columns={
                                [
                                    deleteButton(specialityStore),
                                    { field: 'id', headerName: 'Код', type: 'number', width: 70 },
                                    { field: 'isced', headerName: 'Код программы МСКО (2013)', type: 'number', width: 250 },
                                    { field: 'duration', headerName: 'Длительность (в семестрах)', type: 'number', width: 250 },
                                    { field: 'name', headerName: 'Наименование', width: 500 }
                                ]
                            }
                            onRowClick={row => context.setId(row.row.id)}
                            pageSize={10}
                            loading={specialityStore.loading}
                        />
                    </div>
                </Stack>
            }
        </pageContext.Consumer>
    </Page>
});