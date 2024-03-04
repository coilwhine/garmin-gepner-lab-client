import { Link } from "react-router-dom";
import { dateFormater } from "../../../../Utils/dateFormater";
import "./CourseRow.scss";
import { useEffect, useState } from "react";
import { SubjectModel } from "../../../../Models/subject-modal";

type ownProps = {
    courseData: {
        key?: string,
        id: string,
        startDate: string,
        endDate: string
    },
    allSubjects: SubjectModel[]
}

function CourseRow(props: ownProps): JSX.Element {
    const [courseSubjects, setCourseSubjects] = useState<SubjectModel[] | null>(null)

    useEffect(() => {
        const courseSubjectsArray = props.allSubjects?.filter((res) => {
            return res.courseId === props.courseData.id;
        })
        setCourseSubjects(courseSubjectsArray);
    }, [props.allSubjects])

    return (
        <Link to={`/course/${props.courseData.key}`} className={"CourseRow row"} >
            <span className="course-name">{props.courseData.id}</span>
            <span className="subjects-count">
                {courseSubjects ? courseSubjects.length.toString() : "0"}
            </span>
            <span className="start-date">{dateFormater(props.courseData.startDate)}</span>
            <span className="end-date">{dateFormater(props.courseData.endDate)}</span>
        </Link>
    );
}

export default CourseRow;
