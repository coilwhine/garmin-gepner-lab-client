import { Link } from "react-router-dom";
import { dateFormater } from "../../../../Utils/dateFormater";
import "./CourseRow.scss";
import { useEffect, useState } from "react";
import subjectsService from "../../../../Services/subjects-service";
import { SubjectModel } from "../../../../Models/subject-modal";

type ownProps = {
    courseData: {
        key?: string,
        id: string,
        startDate: string,
        endDate: string,
    }
}

function CourseRow(props: ownProps): JSX.Element {
    const [subjects, setSubjects] = useState<SubjectModel[] | null>(null)

    useEffect(() => {
        subjectsService.getAllSubjectsByCourseId(props.courseData.id)
            .then((res: any) => {
                setSubjects(res)
            });
    })

    return (
        <Link to={`/course/${props.courseData.key}`} className={"CourseRow row"} >
            <span className="course-name">{props.courseData.id}</span>
            <span className="subjects-count">
                {subjects ? subjects.length.toString() : "0"}
            </span>
            <span className="start-date">{dateFormater(props.courseData.startDate)}</span>
            <span className="end-date">{dateFormater(props.courseData.endDate)}</span>
        </Link>
    );
}

export default CourseRow;
