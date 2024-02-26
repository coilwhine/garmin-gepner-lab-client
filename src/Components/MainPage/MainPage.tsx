
import databaseService from "../../Services/dataBase-service";
import "./MainPage.scss";


function MainPage(): JSX.Element {

    const userData = {
        firstName: "Segev",
        lastName: "Hen",
        age: 29,
    };

    const userId = "https://garmin-gepner-lab-client.web.app/privacys-statement";

    return (
        <div className="MainPage">
            <button className="btn" onClick={() => databaseService.addNewUser(userData)}>add new user</button>
            <button className="btn" onClick={() => databaseService.deleteUserById(userId)}>Delete Data</button>
        </div>
    );
}

export default MainPage;
