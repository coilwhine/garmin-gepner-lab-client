import { useNavigate } from "react-router";
import coursesService from "../../../Services/courses-service";
import subjectsService from "../../../Services/subjects-service";
import "./DeletePopUp.scss";
import { CourseModel } from "../../../Models/course-modal";
import watchesService from "../../../Services/watches-service";

type ownProps = {
    itemName: string,
    itemKey: string,
    dbTableName: string,
    setOpenDeletePopUp: Function,
    setWatchesData?: Function,
    setSubjects?: Function,
    courseData?: CourseModel
}

function DeletePopUp(props: ownProps): JSX.Element {
    const navigate = useNavigate();

    async function deleteItem(itemKey: string, dbTableName: string) {
        if (dbTableName === "courses") {
            await coursesService.deleteCourseByKey(itemKey)
            props.setOpenDeletePopUp(false);
            navigate('/')

        } else if (dbTableName === "subjects") {
            await subjectsService.deleteSubjectByKey(itemKey);
            const subjects = await subjectsService.getAllSubjectsByCourseId(props.courseData.id);
            props.setSubjects(subjects);
            props.setOpenDeletePopUp(false);

        } else if (dbTableName === "watches") {
            await watchesService.deleteWatchByKey(itemKey);
            const watches = await watchesService.getAllWatches();
            props.setWatchesData(watches);
            props.setOpenDeletePopUp(false);

        } else {
            throw new Error("Cant finde this DB table");
        }
    }

    return (
        <>
            <div className="DeletePopUp">
                <h3>Are You Sure?</h3>

                <span>
                    Should I delete <span className="emphasize">{props.itemName}</span> from <span className="emphasize">{props.dbTableName}</span>
                </span>

                <div className="btn-wraper">
                    <button type="submit" className="btn del-btn" onClick={() => deleteItem(props.itemKey, props.dbTableName)}>Delete</button>
                    <button type="reset" className="btn" onClick={() => props.setOpenDeletePopUp(false)}>Cancel</button>
                </div>


            </div>
            <div className="dark"></div>
        </>
    );
}

export default DeletePopUp;
