import { Link } from "react-router-dom";
import "./Header.scss";
import { MdPrivacyTip } from "react-icons/md";
import authService from "../../Services/auth-service";
import { IoMdLogOut } from "react-icons/io";
import { useSelector } from "react-redux";
import { User } from "firebase/auth";



function Header(): JSX.Element {
    const userData = useSelector((state: { authData: User | null }) => state.authData);

    return (
        <div className="Header">
            <h1><span>Gepner Lab</span> - Garmin</h1>
            <Link className="privacy-icon" to={"/privacys-statement"}>
                <MdPrivacyTip />
            </Link>
            {userData && <button className="logout-btn" onClick={() => authService.logout()}>
                <IoMdLogOut />
            </button>}
        </div>
    );
}

export default Header;
