import { NavLink } from "react-router-dom";
import "./Header.scss";
import { MdPrivacyTip } from "react-icons/md";
import authService from "../../Services/auth-service";
import { IoMdLogOut } from "react-icons/io";
import { useSelector } from "react-redux";
import { User } from "firebase/auth";
import { HiMiniHome } from "react-icons/hi2";




function Header(): JSX.Element {
    const userData = useSelector((state: { authData: User | null }) => state.authData);

    return (
        <div className="Header">
            <div className="heading">
                <h1>Gepner Lab</h1>
                <h2>Garmin</h2>
            </div>
            <nav className="right-nav">
                <NavLink className="privacy-icon nav-link" to={"/privacys-statement"}>
                    <MdPrivacyTip />
                </NavLink>

                <NavLink className="privacy-icon nav-link" to={"/"}>
                    <HiMiniHome />
                </NavLink>
            </nav>

            <nav className="left-nav">
                {userData && <button className="logout-btn nav-link" onClick={() => authService.logout()}>
                    <IoMdLogOut />
                </button>}
            </nav>
        </div>
    );
}

export default Header;
