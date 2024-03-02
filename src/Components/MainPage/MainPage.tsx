
import { useEffect, useState } from "react";
import CoursesCard from "./CoursesCard/CoursesCard";
import "./MainPage.scss";
import WatchesCard from "./WatchesCard/WatchesCard";
import subjectsService from "../../Services/subjects-service";
import { SubjectModel } from "../../Models/subject-modal";


function MainPage(): JSX.Element {
    const [allSubjects, setAllSubjects] = useState<SubjectModel[] | null>(null);

    useEffect(() => {
        subjectsService.getAllSubjects()
            .then((res: SubjectModel[]) => {
                setAllSubjects(res);
            });
    }, []);

    return (
        <div className="MainPage page">
            <CoursesCard setAllSubjects={setAllSubjects} allSubjects={allSubjects} />
            <WatchesCard setAllSubjects={setAllSubjects} allSubjects={allSubjects} />
        </div>
    );
}

export default MainPage;
