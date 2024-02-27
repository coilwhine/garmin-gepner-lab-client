import CourseRow from "./CourseRow/CourseRow";
import "./CoursesCard.scss";
import { FaPlusCircle } from "react-icons/fa";
import coursesService from "../../../Services/courses-service";
import { useEffect, useState } from "react";
import { CourseModel } from "../../../Models/course-modal";


function CoursesCard(): JSX.Element {

    const [coursesData, setCoursesData] = useState<CourseModel[] | null>(null)

    async function addCourse() {
        await coursesService.addNewCourse({ id: "92A", startDate: "11/11/11", endDate: "11/11/11" })
        coursesService.getAllCourses()
            .then((res) => {
                setCoursesData(res);
            });
    }

    useEffect(() => {

        coursesService.getAllCourses()
            .then((res) => {
                setCoursesData(res);
            });

    }, []);

    return (
        <div className="CoursesCard card">
            <h2>Courses</h2>

            <CourseRow name={"Id"} count={"Subjects"} start={"Start"} end={"End"} header={true} />

            {coursesData?.map((data) => {
                return <CourseRow key={data.id} name={data.id} count={data.id} start={data.startDate} end={data.endDate} header={false} />
            })}

            <button className="add-cours-btn btn"
                onClick={() => addCourse()}
            >
                <FaPlusCircle />
            </button>
        </div>
    );
}

export default CoursesCard;
