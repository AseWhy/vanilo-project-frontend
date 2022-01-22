import { CloudFilterOperator } from "../CloudFilter";

export default interface iCloudFilterField {
    operator?: CloudFilterOperator;
    field: string;
    value?: any;
}
