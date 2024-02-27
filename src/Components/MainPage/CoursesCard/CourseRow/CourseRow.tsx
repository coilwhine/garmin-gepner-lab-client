import "./CourseRow.scss";

type ownProps = {
    header: boolean,
    name: string,
    count: string,
    start: string,
    end: string
}

function CourseRow(props: ownProps): JSX.Element {
    return (
        <div className={props.header ? "CourseRow header" : "CourseRow row"}>
            <span className="course-name">{props.name}</span>
            <span className="subjects-count">{props.count}</span>
            <span className="start-date">{props.start}</span>
            <span className="end-date">{props.end}</span>
        </div>
    );
}

export default CourseRow;
