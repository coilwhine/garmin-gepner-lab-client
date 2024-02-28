import { Navigate, useNavigate } from "react-router";
import coursesService from "../../../Services/courses-service";
import subjectsService from "../../../Services/subjects-service";
import "./DeletePopUp.scss";

type ownProps = {
    itemKey: string,
    dbTableName: string,
    setOpenDeletePopUp: Function
}
function DeletePopUp(props: ownProps): JSX.Element {
    const navigate = useNavigate();

    async function deleteItem(itemKey: string, dbTableName: string) {

        console.log(itemKey, " ", dbTableName);


        if (dbTableName === "courses") {

            await coursesService.deleteCourseByKey(itemKey)
                .then(() => {
                    props.setOpenDeletePopUp(false);
                    navigate('/')
                })

        } else if (dbTableName === "subjects") {

            await subjectsService.deleteSubjectByKey(itemKey)
                .then(() => {
                    props.setOpenDeletePopUp(false);
                })

        } else {
            throw new Error("Cant finde this DB table");
        }
    }

    return (
        <>
            <div className="DeletePopUp">
                <h3>Are You Shure?</h3>

                <span>
                    shuld I delete <span className="emphasize">{props.itemKey}</span> from <span className="emphasize">{props.dbTableName}</span>
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
