import { Link } from "react-router-dom";
import "./ErrorPage.scss";

function ErrorPage(): JSX.Element {
    return (
        <div className="ErrorPage">
            <h1>Sorry, Page Wasn't Found</h1>
            <span>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</span>
            <h1 className="error-number">404</h1>
            <Link to={"/"} className="btn">Return to The Main Page</Link>
        </div>
    );
}

export default ErrorPage;
