import { useForm } from "react-hook-form";
import { WatchModel } from "../../../../Models/watch-modal";
import watchesService from "../../../../Services/watches-service";
import "./NewWatchForm.scss";

type ownProps = {
    setOpenNewWatchForm: Function,
    setWatchesData: Function
}

function NewWatchForm(props: ownProps): JSX.Element {

    const { handleSubmit, register } = useForm<WatchModel>();

    async function onSubmit(data: WatchModel) {
        try {
            const res = await watchesService.addNewWatch(data);

            if (res) {
                const allWatches = await watchesService.getAllWatches();
                props.setWatchesData(allWatches);
            }

            return;
        } catch (error) {
            console.log(error);
        };
    };


    return (
        <>
            <form className="NewWatchForm modal-form popup-modal-form" onSubmit={handleSubmit(onSubmit)}>
                <h2>Create New Watch</h2>
                <div className="inputs-wrap">
                    <div className="input-wraper">
                        <label htmlFor="id-input">Id</label>
                        <input
                            id="id-input"
                            type="text"
                            placeholder="id"
                            {...register("id", { required: true })}
                        />
                    </div>
                </div>

                <div className="btns-wrap">
                    <button className="btn sub-btn" type="submit" >Add</button>
                    <button className="btn res-btn" onClick={() => props.setOpenNewWatchForm(false)}>Cancel</button>
                </div>
            </ form>

            <div className="dark"></div>
        </>
    );
}

export default NewWatchForm;
