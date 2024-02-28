import CourseRow from "./CourseRow/CourseRow";
import "./CoursesCard.scss";
import { FaPlusCircle } from "react-icons/fa";
import coursesService from "../../../Services/courses-service";
import { useEffect, useState } from "react";
import { CourseModel } from "../../../Models/course-modal";
import NewCourseForm from "./NewCourseForm/NewCourseForm";
import { dateFormater } from "../../../Utils/dateFormater";


function CoursesCard(): JSX.Element {

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
    }, [openNewCourseForm])

    return (
        <div className="CoursesCard card">
            <h2>Courses</h2>

            <CourseRow name={"Id"} count={"Subjects"} start={"Start"} end={"End"} header={true} />

            {coursesData ? coursesData.map((data) => {
                return <CourseRow key={data.id} name={data.id} count={"22"} start={dateFormater(data.startDate)} end={dateFormater(data.endDate)} header={false} />
            }) : <div>No Courses Loaded...</div>}

            <button className="add-cours-btn btn"
                onClick={() => setOpenNewCourseForm(true)}
            >
                <FaPlusCircle />
            </button>

            {openNewCourseForm && <NewCourseForm setOpenNewCourseForm={setOpenNewCourseForm} setCoursesData={setCoursesData} />}
        </div>
    );
}

export default CoursesCard;
