import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option: any) => option.display ?? ""
});

export default function PureAutocomplete({ dataset, defaultValue = null, formik, label, property }: any) {
    const [ value, setValue ] = useState(defaultValue);
    const [ inputValue, setInputValue ] = useState('');

    useEffect(() => {
        setValue(defaultValue);
    }, [ defaultValue?.id ?? null ]);

    return <Autocomplete
        sx={{ width: 300 }}
        autoHighlight
        options={dataset}
        value={value}
        isOptionEqualToValue={(left: any, right: any) => left.id === right.id}
        inputValue={inputValue}
        getOptionLabel={(option: any) => option.display ?? ""}
        filterOptions={filterOptions}
        onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue)
        }}
        onChange={
            (e, value) => {
                formik.setFieldValue(property, value?.id || "");
                setValue(value);
            }
        }
        renderInput={(params) => (
            <TextField
                {...params}
                label={label}
                error={formik.touched[property] && Boolean(formik.errors[property])}
                helperText={formik.touched[property] && formik.errors[property]}
                inputProps={
                    {
                        ...params.inputProps,
                        autoComplete: 'new-password'
                    }
                }
            />
            )
        }
    />;
}