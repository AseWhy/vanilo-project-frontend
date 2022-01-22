import { Button, Stack } from "@mui/material";
import { usePageContext } from "../features/Page";

export default function AddButton() {
    const context = usePageContext();

    return <Stack>
        <Button
            type="submit"
            color="primary"
        >
            { context.id != null ? "Обновить" : "Добавить" }
        </Button>

        {
            context.id != null && <Button
                onClick={() => context.setId(null) }
                color="primary"
            >
                Добавить
            </Button>
        }
    </Stack>
}