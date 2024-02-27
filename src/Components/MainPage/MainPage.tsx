
import databaseService from "../../Services/dataBase-service";
import "./MainPage.scss";


function MainPage(): JSX.Element {

    const userData = {
        firstName: "Daniel",
        lastName: "Hen",
        age: 29,
    };

    const userId = "-NravxBRxiTURT1FT0yN";

    const userFirstName = "Daniel";

    return (
        <div className="MainPage">
            <button className="btn" onClick={() => databaseService.addNewUser(userData)}>add new user</button>
            <button className="btn" onClick={() => databaseService.deleteUserById(userId)}>Delete Data</button>
            <button className="btn" onClick={() => databaseService.getUsersByFirstName(userFirstName)}>Get Data</button>
        </div>
    );
}

export default MainPage;
