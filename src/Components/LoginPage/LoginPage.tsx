import "./LoginPage.scss";
import LoginForm from "./LoginForm/LoginForm";

function LoginPage(): JSX.Element {
    return (
        <div className="LoginPage page">
            <LoginForm />
        </div>
    );
}

export default LoginPage;
