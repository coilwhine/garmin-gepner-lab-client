
import usersService from "../../Services/users-service";
import "./MainPage.scss";


function MainPage(): JSX.Element {

    const userData = {
        firstName: "Daniel",
        lastName: "Hen",
        age: 29,
    };

    const userId = "-NreN_pel1OCO9jJbc_-";

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
