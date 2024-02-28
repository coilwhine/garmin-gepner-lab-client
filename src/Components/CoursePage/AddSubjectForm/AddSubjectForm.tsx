import { useForm } from "react-hook-form";
import "./AddSubjectForm.scss";
import { SubjectModel } from "../../../Models/subject-modal";

function AddSubjectForm(): JSX.Element {
    const { handleSubmit, register } = useForm<SubjectModel>();

    function onSubmit(data: SubjectModel) {
        console.log(data);
    }

    return (
        <form className="AddSubjectForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="inputs-wrap">

                <div className="input-wraper">
                    <label htmlFor="id-input">Id</label>
                    <input
                        id="id-input"
                        type="text"
                        placeholder="subject id"
                        {...register("id", { required: true })}
                    />
                </div>

                <div className="input-wraper">
                    <label htmlFor="associatedClock-input">
                        Clock
                    </label>
                    <input
                        id="associatedClock-input"
                        type="text"
                        placeholder="associated clock id"
                        {...register("associatedClock", { required: true })}
                    />
                </div>
            </div>

            <div className="btns-wrap">
                <button className="btn sub-btn" type="submit" >Add</button>
                <button className="btn res-btn" type="reset">Reset</button>
            </div>
        </form>
    );
}

export default AddSubjectForm;
