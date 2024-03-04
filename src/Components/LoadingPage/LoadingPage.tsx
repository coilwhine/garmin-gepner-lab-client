import { CircleLoader } from "react-spinners";
import "./LoadingPage.scss";

function LoadingPage(): JSX.Element {
    return (
        <div className="LoadingPage page">
            <div className="card">
                <h2>loading...</h2>
                <CircleLoader color="#36d7b7" size={70} />
            </div>
        </div>
    );
}

export default LoadingPage;
