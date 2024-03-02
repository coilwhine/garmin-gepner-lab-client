import { CourseModel } from "../Models/course-modal";
import { SubjectModel } from "../Models/subject-modal";
import { WatchModel } from "../Models/watch-modal";

export function notInUseWatches(startDate: string | Date, endDate: string | Date, allWatches: WatchModel[], allCourses: CourseModel[], allSubjects: SubjectModel[]): WatchModel[] | [] {

    const overlapingCourses = allCourses.filter((course: CourseModel) => {

        startDate = new Date(startDate);
        endDate = new Date(endDate);

        const courseStartDate = new Date(course.startDate);
        const courseEndDate = new Date(course.endDate);

        return (courseStartDate >= startDate && courseStartDate <= endDate) ||
            (courseEndDate <= endDate && courseEndDate >= startDate);
    });

    const overlapingSubjectsWatchId: string[] = []

    allSubjects.forEach((sub: SubjectModel) => {
        overlapingCourses.forEach((cur: CourseModel) => {
            if (sub.courseId === cur.id) {
                overlapingSubjectsWatchId.push(sub.associatedWatch);
            }
        });
    });

    const resoult = allWatches.filter((watch: WatchModel) => {
        return !overlapingSubjectsWatchId.includes(watch.id);
    })

    return resoult;
}