import { useForm } from "react-hook-form";
import "./AddSubjectForm.scss";
import { SubjectModel } from "../../../Models/subject-modal";
import subjectsService from "../../../Services/subjects-service";
import { CourseModel } from "../../../Models/course-modal";

type ownProps = {
    courseData: CourseModel,
    setSubjects: Function
}

function AddSubjectForm(props: ownProps): JSX.Element {
    const { handleSubmit, register } = useForm<SubjectModel>();

    function onSubmit(data: SubjectModel) {
        subjectsService.addNewSubject({
            id: data.id,
            associatedWatch: data.associatedWatch,
            courseId: props.courseData.id
        }).then(() => {
            subjectsService.getAllSubjectsByCourseId(props.courseData.id)
                .then((res) => {
                    props.setSubjects(res)
                });
        });
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
                    <label htmlFor="associatedWatch-input">
                        Watch
                    </label>
                    <input
                        id="associatedWatch-input"
                        type="text"
                        placeholder="associated watch id"
                        {...register("associatedWatch", { required: true })}
                    />
                </div>
            </div>

            <div className="btns-wrap">
                <button className="btn sub-btn" type="submit" disabled={!props.courseData}>Add</button>
                <button className="btn res-btn" type="reset">Reset</button>
            </div>
        </form>
    );
}

export default AddSubjectForm;
