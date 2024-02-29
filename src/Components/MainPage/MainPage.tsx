
import CoursesCard from "./CoursesCard/CoursesCard";
import "./MainPage.scss";
import WatchesCard from "./WatchesCard/WatchesCard";


function MainPage(): JSX.Element {



    return (
        <div className="MainPage page">
            <CoursesCard />
            <WatchesCard />
        </div>
    );
}

export default MainPage;
