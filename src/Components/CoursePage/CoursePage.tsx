import { useEffect, useState } from "react";
import "./CoursePage.scss";
import { useParams } from "react-router-dom";
import coursesService from "../../Services/courses-service";
import { CourseModel } from "../../Models/course-modal";
import AddSubjectForm from "./AddSubjectForm/AddSubjectForm";
import SubjectCard from "./SubjectCard/SubjectsCard";

function CoursePage(): JSX.Element {
    const [courseData, setCourseData] = useState<CourseModel | null>(null);
    const courseKey = useParams().key;

    useEffect(() => {
        coursesService.getCourseByKey(courseKey)
            .then((res) => {
                setCourseData(res);
            })
    }, [])

    return (
        <div className="CoursePage">
            <h2>Course {courseData?.id}</h2>
            <AddSubjectForm />
            <SubjectCard />
        </div>
    );
}

export default CoursePage;
