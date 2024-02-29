import { useEffect, useState } from "react";
import "./WatchesCard.scss";
import { WatchModel } from "../../../Models/watch-modal";
import watchesService from "../../../Services/watches-service";
import WatchRow from "./WatchRow/WatchRow";
import { FaPlusCircle } from "react-icons/fa";
import NewWatchForm from "./NewWatchForm/NewWatchForm";

function WatchesCard(): JSX.Element {
    const [watchesData, setWatchesData] = useState<WatchModel[] | null>(null);
    const [openNewWatchForm, setOpenNewWatchForm] = useState<boolean>(false);

    useEffect(() => {
        watchesService.getAllWatches()
            .then((res) => {
                setWatchesData(res);
            });
    }, []);

    return (
        <div className="WatchesCard card">
            <h2>Watches</h2>

            <div className={"watchesHeaderRow header-row row"}>
                <span className="watch-name">{"Watch Name"}</span>
                <span className="last-update">{"Last Update"}</span>
                <span className="indication">{"Indication"}</span>
            </div>

            {watchesData ? watchesData.map((data) => {
                return <WatchRow key={data.id} watchData={data} setWatchesData={setWatchesData} />
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
