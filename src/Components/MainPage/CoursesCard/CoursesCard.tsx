import CourseRow from "./CourseRow/CourseRow";
import "./CoursesCard.scss";
import { FaPlusCircle } from "react-icons/fa";
import coursesService from "../../../Services/courses-service";
import { useEffect, useState } from "react";
import { CourseModel } from "../../../Models/course-modal";
import NewCourseForm from "./NewCourseForm/NewCourseForm";
import { SubjectModel } from "../../../Models/subject-modal";

type ownProps = {
    setAllSubjects: Function,
    allSubjects: SubjectModel[]
}

function CoursesCard(props: ownProps): JSX.Element {

    const [coursesData, setCoursesData] = useState<CourseModel[] | null>(null)
    const [openNewCourseForm, setOpenNewCourseForm] = useState(false);

    useEffect(() => {
        coursesService.getAllCourses()
            .then((res) => {
                setCoursesData(res);
            });
    }, []);

    useEffect(() => {
        if (openNewCourseForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [openNewCourseForm]);

    return (
        <div className="CoursesCard card">
            <h2>Courses</h2>

            <div className={"courseHeaderRow header-row row"}>
                <span className="course-name">{"Name"}</span>
                <span className="subjects-count">{"Subjects"}</span>
                <span className="start-date">{"Start"}</span>
                <span className="end-date">{"End"}</span>
            </div>

            {coursesData ? coursesData.map((data) => {
                return <CourseRow key={data.id} courseData={data} allSubjects={props.allSubjects} />
            }) : <div>No Courses Loaded...</div>}

            <button className="add-card-btn btn"
                onClick={() => setOpenNewCourseForm(true)}
            >
                <FaPlusCircle />
            </button>

            {openNewCourseForm && <NewCourseForm setOpenNewCourseForm={setOpenNewCourseForm} setCoursesData={setCoursesData} />}
        </div>
    );
}

export default CoursesCard;
