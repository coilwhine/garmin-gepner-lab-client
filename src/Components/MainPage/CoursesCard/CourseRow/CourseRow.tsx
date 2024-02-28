import { Link } from "react-router-dom";
import { dateFormater } from "../../../../Utils/dateFormater";
import "./CourseRow.scss";

type ownProps = {
    courseData: {
        key?: string,
        id: string,
        startDate: string,
        endDate: string,
        subjects: string[] | string
    }
}

function CourseRow(props: ownProps): JSX.Element {

    return (
        <Link to={`/course/${props.courseData.key}`} className={"CourseRow row"} >
            <span className="course-name">{props.courseData.id}</span>
            <span className="subjects-count">
                {props.courseData.subjects ? props.courseData.subjects.length.toString() : "0"}
            </span>
            <span className="start-date">{dateFormater(props.courseData.startDate)}</span>
            <span className="end-date">{dateFormater(props.courseData.endDate)}</span>
        </Link>
    );
}

export default CourseRow;
