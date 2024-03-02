import { useForm } from "react-hook-form";
import "./NewSubjectForm.scss";
import { SubjectModel } from "../../../Models/subject-modal";
import subjectsService from "../../../Services/subjects-service";
import { CourseModel } from "../../../Models/course-modal";
import { WatchModel } from "../../../Models/watch-modal";

type ownProps = {
    courseData: CourseModel,
    setSubjects: Function,
    freeWatches: WatchModel[]
    setFreeWatches: Function
}

function AddSubjectForm(props: ownProps): JSX.Element {
    const { handleSubmit, register } = useForm<SubjectModel>();

    async function onSubmit(data: SubjectModel) {
        const res = await subjectsService.addNewSubject({
            id: data.id,
            associatedWatch: data.associatedWatch,
            courseId: props.courseData.id
        });

        if (res) {
            const allSubjects = await subjectsService.getAllSubjectsByCourseId(props.courseData.id);
            props.setSubjects(allSubjects);
        };
    };

    return (
        <form className="NewSubjectForm modal-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Create New Subject</h2>
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
                    <label htmlFor="associatedWatch-input">
                        Watch
                    </label>

                    {props.freeWatches ?

                        <select
                            id="associatedWatch-input"
                            {...register("associatedWatch", { required: true })}>
                            {props.freeWatches.map((watch: WatchModel) => {
                                return <option key={watch.id} value={watch.id}>{watch.id}</option>
                            })}

                        </select> :

                        <div>no watches</div>
                    }
                </div>
            </div>

            <div className="btns-wrap">
                <button className="btn sub-btn" type="submit" disabled={!props.courseData}>Add</button>
                <button className="btn res-btn" type="reset">Reset</button>
            </div>
        </form>
    );
};

export default AddSubjectForm;
