import { useEffect, useState } from "react";
import "./CoursePage.scss";
import { useParams } from "react-router-dom";
import coursesService from "../../Services/courses-service";
import { CourseModel } from "../../Models/course-modal";
import AddSubjectForm from "./AddSubjectForm/AddSubjectForm";
import SubjectCard from "./SubjectCard/SubjectsCard";
import subjectsService from "../../Services/subjects-service";
import { SubjectModel } from "../../Models/subject-modal";
import { IoTrashSharp } from "react-icons/io5";
import DeletePopUp from "./DeletePopUp/DeletePopUp";


function CoursePage(): JSX.Element {
    const [courseData, setCourseData] = useState<CourseModel | null>(null);
    const [subjects, setSubjects] = useState<SubjectModel[] | null>(null);
    const [openDeletePopUp, setOpenDeletePopUp] = useState<boolean>(false);
    const [deleteData, setDeleteData] = useState<{ itemKey: string, dbTableName: string } | null>(null)
    const courseKey = useParams().key;

    function deleteFunc(itemKey: string, dbTableName: string) {
        setDeleteData({ itemKey, dbTableName })
        setOpenDeletePopUp(true);
    }

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
        <>
            <div className="CoursePage">
                <h2>Course {courseData?.id}</h2>
                <AddSubjectForm courseData={courseData} setSubjects={setSubjects} />
                <SubjectCard courseData={courseData} subjects={subjects} />
                <button className="delete-btn btn" onClick={(() => deleteFunc(courseData.key, "courses"))}>
                    <IoTrashSharp />
                    Delete Course
                </button>
            </div>

            {openDeletePopUp && <DeletePopUp itemKey={courseKey} dbTableName={deleteData.dbTableName} setOpenDeletePopUp={setOpenDeletePopUp} />}
        </>
    );
}

export default CoursePage;