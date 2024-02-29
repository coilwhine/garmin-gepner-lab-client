import { useState } from "react";
import { WatchModel } from "../../../../Models/watch-modal";
import { dateFormater } from "../../../../Utils/dateFormater";
import "./WatchRow.scss";
import { IoTrashSharp } from "react-icons/io5";
import DeletePopUp from "../../../CoursePage/DeletePopUp/DeletePopUp";

type ownProps = {
    watchData: WatchModel,
    setWatchesData: Function
}

function WatchRow(props: ownProps): JSX.Element {
    const [openDeletePopUp, setOpenDeletePopUp] = useState<boolean>(false);
    const [deleteData, setDeleteData] = useState<{ itemName: string, itemKey: string, dbTableName: string } | null>(null)

    function deleteFunc(itemName: string, itemKey: string, dbTableName: string) {
        setDeleteData({ itemName, itemKey, dbTableName })
        setOpenDeletePopUp(true);
    }


    return (
        <>
            <div className="WatchRow row">
                <span>{props.watchData.id}</span>
                <span>{props.watchData.timeOfUpdate ? dateFormater(props.watchData.timeOfUpdate.toString()) : "null"}</span>
                <div className="update-indicator"></div>
                <button className="btn delete-btn" onClick={(() => deleteFunc(props.watchData.id, props.watchData.key, "watches"))}>
                    <IoTrashSharp />
                </button>
            </div>

            {openDeletePopUp && <DeletePopUp itemName={deleteData.itemName} itemKey={deleteData.itemKey} dbTableName={deleteData.dbTableName} setOpenDeletePopUp={setOpenDeletePopUp} setWatchesData={props.setWatchesData} />}
        </>
    );
}

export default WatchRow;
