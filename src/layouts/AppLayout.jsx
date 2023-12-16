import { Outlet } from "react-router-dom";
import AppSidebar from "../components/AppSideBar/AppSidebar.jsx";
import style from "../components/AppSideBar/AppSideBar.module.css"


function AppLayout() {
return (
<div className={` row m-0`}>
    <div className={`col-4 col-md-3 col-lg-2 p-0 ${style.body}`}>
        <AppSidebar />
    </div>
    <div className="col-7 col-md-9 col-lg-10 p-0 ">
        <Outlet />
    </div>
</div>
);
}

export default AppLayout;
