import CourseRow from "./CourseRow/CourseRow";
import "./CoursesCard.scss";
import { FaPlusCircle } from "react-icons/fa";


function CoursesCard(): JSX.Element {
    return (
        <div className="CoursesCard card">
            <h2>Courses</h2>
            <CourseRow name={"ID"} count={"Subjects"} start={"Start"} end={"End"} header={true} />
            <CourseRow name={"A24B01"} count={"30"} start={"01/02/24"} end={"21/03/24"} header={false} />
            <CourseRow name={"A24B02"} count={"32"} start={"15/02/24"} end={"13/04/24"} header={false} />
            <CourseRow name={"A24B03"} count={"25"} start={"23/02/24"} end={"01/05/24"} header={false} />

            <button className="add-cours-btn btn">
                <FaPlusCircle />
            </button>
        </div>
    );
}

export default CoursesCard;
