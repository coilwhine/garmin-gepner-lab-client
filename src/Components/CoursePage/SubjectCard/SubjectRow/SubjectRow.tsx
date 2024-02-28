import { SubjectModel } from "../../../../Models/subject-modal";
import "./SubjectRow.scss";

type ownProps = {
    subjectData: SubjectModel
}

function SubjectRow(props: ownProps): JSX.Element {
    return (
        <div className="SubjectRow">
            <span>{props.subjectData.id}</span>
            <span>{props.subjectData.associatedClock}</span>
        </div>
    );
}

export default SubjectRow;
