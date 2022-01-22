import { MenuItem, MenuList, Paper, Stack } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import ServiceRouter from "../../router/ServiceRoute";

export const pageContext = createContext<any>({});

export const usePageContext = () => useContext(pageContext);

export default function Page({ children }: any) {
    const [ id, setId ] = useState(null);

    return <Stack direction="row" spacing={2}>
        <Paper>
            <MenuList>
                <MenuItem>
                    <NavLink activeClassName="lnk-act" to={ServiceRouter.peoplesPage.routeWithoutParams}> Люди </NavLink>
                </MenuItem>

                <MenuItem> 
                    <NavLink activeClassName="lnk-act" to={ServiceRouter.studentsPage.routeWithoutParams}> Студенты </NavLink>
                </MenuItem>

                <MenuItem> 
                    <NavLink activeClassName="lnk-act" to={ServiceRouter.groupsPage.routeWithoutParams}> Группы </NavLink>
                </MenuItem>

                <MenuItem>
                    <NavLink activeClassName="lnk-act" to={ServiceRouter.specialityPage.routeWithoutParams}> Специальности </NavLink>
                </MenuItem>

                <MenuItem>
                    <NavLink activeClassName="lnk-act" to={ServiceRouter.semestersPage.routeWithoutParams}> Семестры </NavLink>
                </MenuItem>

                <MenuItem>
                    <NavLink activeClassName="lnk-act" to={ServiceRouter.teachersPage.routeWithoutParams}> Преподаватели </NavLink>
                </MenuItem>

                <MenuItem>
                    <NavLink activeClassName="lnk-act" to={ServiceRouter.thingsPage.routeWithoutParams}> Предметы </NavLink>
                </MenuItem>

                <MenuItem>
                    <NavLink activeClassName="lnk-act" to={ServiceRouter.statementsPage.routeWithoutParams}> Отчетности </NavLink>
                </MenuItem>
            </MenuList>
        </Paper>

        <pageContext.Provider value={
            {
                id,
                setId
            }
        }>
            <Paper style={{ width: "100%", height: "min(100%, 20rem)", padding: "0.5rem" }}>
                { children }
            </Paper>
        </pageContext.Provider>
    </Stack>
}