import { useEffect, useState } from "react";
import "./WatchesCard.scss";
import { WatchModel } from "../../../Models/watch-modal";
import watchesService from "../../../Services/watches-service";
import WatchRow from "./WatchRow/WatchRow";
import { FaPlusCircle } from "react-icons/fa";
import NewWatchForm from "./NewWatchForm/NewWatchForm";
import { SubjectModel } from "../../../Models/subject-modal";

type ownProps = {
    setAllSubjects: Function,
    allSubjects: SubjectModel[]
}

function WatchesCard(props: ownProps): JSX.Element {
    const [watchesData, setWatchesData] = useState<WatchModel[] | null>(null);
    const [openNewWatchForm, setOpenNewWatchForm] = useState<boolean>(false);
    const [corentWatchHolders, setCorentWatchHolders] = useState<SubjectModel[] | null>(null)

    useEffect(() => {
        watchesService.getAllWatches()
            .then((res) => {
                setWatchesData(res);
            });

        watchesService.getCorentWatchHolders()
            .then((res) => {
                setCorentWatchHolders(res);
            });
    }, []);

    return (
        <div className="WatchesCard card">
            <h2>Watches</h2>

            <div className={"watchesHeaderRow header-row row"}>
                <span className="watch-name">{"Id"}</span>
                <span className="watch-holder">{"User"}</span>
                <span className="last-update">{"Updated"}</span>
                <span className="indication">{"stat"}</span>
            </div>

            {watchesData ? watchesData.map((data) => {
                return <WatchRow key={data.id} watchData={data} setWatchesData={setWatchesData} allSubjects={props.allSubjects} corentWatchHolders={corentWatchHolders} />
            }) : <div>No Watches Loaded...</div>}

            <button className="add-card-btn btn"
                onClick={() => setOpenNewWatchForm(true)}
            >
                <FaPlusCircle />
            </button>

            {openNewWatchForm && <NewWatchForm setOpenNewWatchForm={setOpenNewWatchForm} setWatchesData={setWatchesData} />}
        </div>
    );
}

export default WatchesCard;
