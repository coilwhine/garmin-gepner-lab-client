import { useState } from "react";
import "./SubjectsCard.scss";
import SubjectRow from "./SubjectRow/SubjectRow";
import { SubjectModel } from "../../../Models/subject-modal";

function SubjectsCard(): JSX.Element {
    const [subjectsData, setSubjectsData] = useState<SubjectModel[] | null>(null)

    // useEffect(() => {

    //     coursesService.getAllCourses()
    //         .then((res) => {
    //             setCoursesData(res);
    //         });

    // }, []);

    return (
        <div className="SubjectsCard">
            <h2>Subjects Cards</h2>
            <div className="subjectHeaderRow">
                <span className="user-id">{"User ID"}</span>
                <span className="clock-date">{"Associated Clock"}</span>
            </div>

            {/* {coursesData ? coursesData.map((data) => {
                return <SubjectRow key={data.id} courseData={data} />
            }) : <div>No Subject Loaded...</div>} */}

        </div>
    );
}

export default SubjectsCard;
