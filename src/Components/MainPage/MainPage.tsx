
import usersService from "../../Services/users-service";
import "./MainPage.scss";


function MainPage(): JSX.Element {

    const userData = {
        email: "asd@asd",
        password: "asdasd",
    };

    const userId = "-NreP0hWs6VyPukao51O";

    const userEmail = "asd@asd";

    return (
        <div className="MainPage">
            <button className="btn" onClick={() => usersService.addNewUser(userData)}>add new user</button>
            <button className="btn" onClick={() => usersService.deleteUserById(userId)}>Delete Data</button>
            <button className="btn" onClick={() => usersService.getUsersByEmail(userEmail)}>Get Users By Email</button>
            <button className="btn" onClick={() => usersService.getUserByEmail(userEmail)}>Get User By Email</button>
        </div>
    );
}

export default MainPage;
