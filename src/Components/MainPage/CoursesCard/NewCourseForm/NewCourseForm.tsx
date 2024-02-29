import { CourseModel } from "../../../../Models/course-modal";
import coursesService from "../../../../Services/courses-service";
import "./NewCourseForm.scss";
import { useForm } from "react-hook-form";
import { BsCalendarDateFill } from "react-icons/bs";


type ownProps = {
    setOpenNewCourseForm: Function,
    setCoursesData: Function
}

function NewCourseForm(props: ownProps): JSX.Element {

    const { handleSubmit, register } = useForm<CourseModel>();

    async function onSubmit(data: CourseModel) {
        try {
            await coursesService.addNewCourse(data);
            coursesService.getAllCourses()
                .then((res) => {
                    props.setCoursesData(res);
                });
            props.setOpenNewCourseForm(false);
            return;
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <form className="NewCourseForm" onSubmit={handleSubmit(onSubmit)}>
                <h2>Create New Course</h2>

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

                    <div className="input-wraper">
                        <label htmlFor="start-date-input">
                            Start Date
                            <BsCalendarDateFill />
                        </label>
                        <input
                            id="start-date-input"
                            type="date"
                            placeholder="start date"
                            {...register("startDate", { required: true })}
                        />
                    </div>

                    <div className="input-wraper">
                        <label htmlFor="end-date-input">
                            End Date
                            <BsCalendarDateFill />
                        </label>
                        <input
                            id="end-date-input"
                            type="date"
                            placeholder="end date"
                            {...register("endDate", { required: true })}
                        />
                    </div>

                </div>

                <div className="btns-wrap">
                    <button className="btn sub-btn" type="submit" >Add</button>
                    <button className="btn res-btn" onClick={() => props.setOpenNewCourseForm(false)}>Cancel</button>
                </div>
            </ form>

            <div className="dark"></div>
        </>
    );
}

export default NewCourseForm;
