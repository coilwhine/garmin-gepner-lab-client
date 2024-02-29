import "./SubjectsCard.scss";
import { CourseModel } from "../../../Models/course-modal";
import { SubjectModel } from "../../../Models/subject-modal";
import SubjectRow from "./SubjectRow/SubjectRow";

type ownProps = {
    courseData: CourseModel,
    subjects: SubjectModel[],
    deleteFunc: Function
}

function SubjectsCard(props: ownProps): JSX.Element {

    return (
        <div className="SubjectsCard card">
            <h2>Subjects Cards</h2>
            <div className="subjectHeaderRow header-row row">
                <span className="user-id">{"Subject ID"}</span>
                <span className="Watch-date">{"Associated Watch"}</span>
            </div>

            {props.subjects ? props.subjects.map((data) => {
                return <SubjectRow key={data.key} subjectData={data} courseData={props.courseData} deleteFunc={props.deleteFunc} />
            }) : <div>No Subject Loaded...</div>}

        </div>
    );
}

export default SubjectsCard;
