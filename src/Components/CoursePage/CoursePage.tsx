import { useEffect, useState } from "react";
import "./CoursePage.scss";
import { useParams } from "react-router-dom";
import coursesService from "../../Services/courses-service";
import { CourseModel } from "../../Models/course-modal";
import AddSubjectForm from "./NewSubjectForm/NewSubjectForm";
import SubjectCard from "./SubjectCard/SubjectsCard";
import subjectsService from "../../Services/subjects-service";
import { SubjectModel } from "../../Models/subject-modal";
import { IoTrashSharp } from "react-icons/io5";
import DeletePopUp from "./DeletePopUp/DeletePopUp";
import watchesService from "../../Services/watches-service";
import { WatchModel } from "../../Models/watch-modal";


function CoursePage(): JSX.Element {
    const [courseData, setCourseData] = useState<CourseModel | null>(null);
    const [subjects, setSubjects] = useState<SubjectModel[] | null>(null);
    const [freeWatches, setFreeWatches] = useState<WatchModel[] | null>(null);
    const [openDeletePopUp, setOpenDeletePopUp] = useState<boolean>(false);
    const [deleteData, setDeleteData] = useState<{ itemName: string, itemKey: string, dbTableName: string } | null>(null)
    const courseKey = useParams().key;

    function deleteFunc(itemName: string, itemKey: string, dbTableName: string) {
        setDeleteData({ itemName, itemKey, dbTableName })
        setOpenDeletePopUp(true);
    }

    useEffect(() => {
        coursesService.getCourseByKey(courseKey)
            .then((res: CourseModel) => {
                setCourseData(res);
            });
    }, []);

    useEffect(() => {
        {
            courseData && subjectsService.getAllSubjectsByCourseId(courseData.id)
                .then((res) => {
                    setSubjects(res);
                });

        }
    }, [courseData])

    useEffect(() => {
        if (courseData) {
            watchesService.getFreeWatchesByCourses(courseData)
                .then((res) => setFreeWatches(res));
        };

    }, [subjects]);

    return (
        <>
            <div className="CoursePage page">
                <h2>Course {courseData?.id}</h2>
                <AddSubjectForm courseData={courseData} setSubjects={setSubjects} freeWatches={freeWatches} setFreeWatches={setFreeWatches} />
                <SubjectCard courseData={courseData} subjects={subjects} deleteFunc={deleteFunc} />
                <button className="delete-btn btn" onClick={(() => deleteFunc(courseData.id, courseData.key, "courses"))}>
                    <IoTrashSharp />
                    Delete Course
                </button>
            </div>

            {openDeletePopUp && <DeletePopUp itemName={deleteData.itemName} itemKey={deleteData.itemKey} dbTableName={deleteData.dbTableName} setSubjects={setSubjects} setOpenDeletePopUp={setOpenDeletePopUp} courseData={courseData} />}
        </>
    );
}

export default CoursePage;
