import "./LoginPage.scss";
import authService from "../../Services/auth-service";

function LoginPage(): JSX.Element {

    const userEmail = "hen.daniel47@gmail.com";
    const userPassword = "asdasd"


    return (
        <div className="LoginPage">

            <button className="btn" onClick={() => authService.login(userEmail, userPassword)}>Login</button>

            {/* <button className="btn" onClick={() => authService.signin(userEmail, userPassword)}>Signin</button> */}

            <button className="btn" onClick={() => authService.logout()}>Logout</button>

            {/* <button className="btn" onClick={() => authService.monitorAuthState()}>User State</button> */}
        </div>
    );
}

export default LoginPage;
