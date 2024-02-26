import { Link } from "react-router-dom";
import "./Header.scss";
import { MdPrivacyTip } from "react-icons/md";


function Header(): JSX.Element {
    return (
        <div className="Header">
            <h1>Gepner Lab - Garmin Project</h1>
            <Link className="privacy-icon" to={"/privacys-statement"}>
                <MdPrivacyTip />
            </Link>
        </div>
    );
}

export default Header;
