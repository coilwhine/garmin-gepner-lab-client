import { Outlet } from "react-router";
import "./LayOut.scss";
import Header from "../Header/Header";

function LayOut(): JSX.Element {
    return (
        <div className="LayOut">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default LayOut;
