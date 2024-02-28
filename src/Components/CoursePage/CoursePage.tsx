import { useEffect, useState } from "react";
import "./CoursePage.scss";
import { useParams } from "react-router-dom";
import coursesService from "../../Services/courses-service";
import { CourseModel } from "../../Models/course-modal";
import AddSubjectForm from "./AddSubjectForm/AddSubjectForm";
import SubjectCard from "./SubjectCard/SubjectsCard";
import subjectsService from "../../Services/subjects-service";
import { SubjectModel } from "../../Models/subject-modal";

function CoursePage(): JSX.Element {
    const [courseData, setCourseData] = useState<CourseModel | null>(null);
    const [subjects, setSubjects] = useState<SubjectModel[] | null>(null);
    const courseKey = useParams().key;

    useEffect(() => {
        coursesService.getCourseByKey(courseKey)
            .then((res) => {
                setCourseData(res);
            })
    }, [])

    useEffect(() => {
        {
            courseData && subjectsService.getAllSubjectsByCourse(courseData.id)
                .then((res) => {
                    setSubjects(res);
                })
        }
    }, [courseData])

    return (
        <div className="CoursePage">
            <h2>Course {courseData?.id}</h2>
            <AddSubjectForm courseData={courseData} setSubjects={setSubjects} />
            <SubjectCard courseData={courseData} subjects={subjects} />
        </div>
    );
}

export default CoursePage;
