import authService from "../../../Services/auth-service";
import "./LoginForm.scss";
import { useForm } from "react-hook-form";

type LoginFormModel = {
    email: string,
    password: string
}

function LoginForm(): JSX.Element {
    const { handleSubmit, register } = useForm<LoginFormModel>();

    async function onSubmit(data: LoginFormModel) {
        try {
            await authService.login(data.email, data.password);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
            <h2>Login</h2>
            <div className="inputs-wrap">
                <input
                    type="text"
                    placeholder="email"
                    {...register("email", { required: true })}
                />
                <input
                    id="password-input"
                    type="text"
                    placeholder="password"
                    {...register("password", { required: true })}
                />

            </div>
            <div className="btns-wrap">
                <button className="btn sub-btn" type="submit" >Login</button>
                <button className="btn res-btn" type="reset">Reset</button>
            </div>
        </form>
    );
}

export default LoginForm;
