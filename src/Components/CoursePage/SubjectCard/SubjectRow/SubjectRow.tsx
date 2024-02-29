import { CourseModel } from "../../../../Models/course-modal";
import { SubjectModel } from "../../../../Models/subject-modal";
import "./SubjectRow.scss";
import { IoTrashSharp } from "react-icons/io5";

type ownProps = {
    subjectData: SubjectModel,
    deleteFunc: Function,
    courseData: CourseModel,
}

function SubjectRow(props: ownProps): JSX.Element {

    return (
        <div className="SubjectRow row">
            <span>{props.subjectData.id}</span>
            <span>{props.subjectData.associatedWatch}</span>

            <button className="btn delete-btn" onClick={(() => props.deleteFunc(props.subjectData.id, props.subjectData.key, "subjects"))}>
                <IoTrashSharp />
            </button>

        </div>
    );
}

export default SubjectRow;
