
import usersService from "../../Services/users-service";
import "./MainPage.scss";


function MainPage(): JSX.Element {

    const userData = {
        firstName: "Daniel",
        lastName: "Hen",
        age: 29,
    };

    const userId = "-NreP0hWs6VyPukao51O";

    const userFirstName = "Daniel";

    return (
        <div className="MainPage">
            <button className="btn" onClick={() => usersService.addNewUser(userData)}>add new user</button>
            <button className="btn" onClick={() => usersService.deleteUserById(userId)}>Delete Data</button>
            <button className="btn" onClick={() => usersService.getUsersByFirstName(userFirstName)}>Get Data</button>
        </div>
    );
}

export default MainPage;
