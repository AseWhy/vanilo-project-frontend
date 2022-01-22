import { GridRenderCellParams } from "@mui/x-data-grid";
import { Button } from "@mui/material";

export default function deleteButton(store: any) {
    return { 
        field: '',
        headerName: 'Удалить', 
        width: 100, 
        sortable: false,
        hideable: false,
        pinnable: false,
        renderCell: (params: GridRenderCellParams) => <Button
            type="button"
            onClick={(event) => {
                if(event) {
                    event.stopPropagation();
                }
    
                store.delete(params.row.id)
            }}
        >
            Удалить
        </Button>
    };
}