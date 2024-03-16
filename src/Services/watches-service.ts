import { DataSnapshot, get, push, ref, remove, set } from "firebase/database";
import { firebaseDB } from "../firebase-config";
import { WatchModel } from "../Models/watch-modal";
import { createLog } from "../Utils/logs";
import coursesService from "./courses-service";
import { CourseModel } from "../Models/course-modal";
import subjectsService from "./subjects-service";
import { SubjectModel } from "../Models/subject-modal";

class WatchesService {

    async getWatchByKey(key: string): Promise<WatchModel | null> {

        const watchesRef = ref(firebaseDB, `watches/${key}`);
        console.log("getWatchByKey");

        try {
            const watchSnapshot = await get(watchesRef);

            if (watchSnapshot.exists()) {
                return watchSnapshot.val();

            } else {
                console.log("No watches found in the database.");
                return null;
            }

        } catch (error) {
            console.error("Error getting watch by key:", error);
            throw error;
        }
    };

    async getwatchById(id: string): Promise<WatchModel | null> {

        const watchesRef = ref(firebaseDB, 'watches');
        console.log("getwatchById");

        try {
            const watchesSnapshot = await get(watchesRef);

            if (watchesSnapshot.exists()) {

                watchesSnapshot.forEach((childSnapshot: DataSnapshot) => {
                    const watch = childSnapshot.val();
                    if (watch.id === id) {
                        watch.key = childSnapshot.key;
                        return watch;
                    }
                });

                return null;

            } else {
                console.log("No watches found in the database.");
                return null;
            }

        } catch (error) {
            console.error("Error getting watch by id:", error);
            throw error;
        }
    };

    async getAllWatches(): Promise<WatchModel[] | null> {

        const watchesRef = ref(firebaseDB, 'watches');
        console.log("getAllwatches");

        try {
            const watchesSnapshot = await get(watchesRef);

            if (watchesSnapshot.exists()) {
                const watchesList: WatchModel[] = [];

                watchesSnapshot.forEach((childSnapshot: DataSnapshot) => {
                    const watch = childSnapshot.val();

                    watch.key = childSnapshot.key;

                    watchesList.push(watch);
                });
                watchesList.sort((a: any, b: any) => {

                    if (a.id < b.id) {
                        return -1;
                    } else if (a.id > b.id) {
                        return 1;
                    };
                });

                return watchesList;

            } else {
                console.log("No watches found in the database.");
                return null;
            };

        } catch (error) {
            console.error("Error getting watches:", error);
            throw error;
        };
    };

    async addNewWatch(newWatchData: WatchModel): Promise<string> {

        const corentWatches = await this.getAllWatches();
        console.log("addNewWatch");

        let idAlreadyExist = corentWatches?.filter(watch => {
            return watch.id === newWatchData.id;
        });

        if (idAlreadyExist && idAlreadyExist.length > 0) {
            console.log("Id all ready in use");
            return;
        };

        const dataRef = ref(firebaseDB, 'watches/');
        const newWatchRef = push(dataRef);
        try {
            await set(newWatchRef, {
                id: newWatchData.id,
                timeOfUpdate: null
            });

            console.log("Data added successfully with key:", newWatchRef.key);
            return newWatchRef.key;

        } catch (error) {
            console.error("Error adding data:", error);
            throw error;
        };
    };

    async deleteWatchByKey(watchtKey: string, userEmail: string): Promise<void> {
        const dataRef = ref(firebaseDB, `watches/${watchtKey}`);
        console.log("deleteWatchByKey");

        try {
            await remove(dataRef);
            await createLog(firebaseDB, userEmail, `Delete ${watchtKey} watch`);
            console.log("Data deleted successfully!");
            return;

        } catch (error) {
            console.error("Error deleting data: ", error);
        };
    };

    async getCorentWatchHolders(): Promise<SubjectModel[] | null> {

        console.log("getCorentWatchesHolders");

        try {

            const corentTime = new Date();
            const allCourses = await coursesService.getAllCourses();

            const corentCourses = allCourses.filter((course: CourseModel) => {

                const startDate = new Date(course.startDate);
                const endDate = new Date(course.endDate);

                if ((startDate <= corentTime) && (endDate >= corentTime)) {
                    return course;
                };
            });

            const corentCoursesId: string[] = []
            corentCourses.map((course: CourseModel) => {
                corentCoursesId.push(course.id);
            });

            const allSubjects = await subjectsService.getAllSubjects();

            const corentSubjects = allSubjects.filter((subject: SubjectModel) => {
                if (corentCoursesId.includes(subject.courseId)) {
                    return subject;
                };
            });

            return corentSubjects;

        } catch (error) {
            console.error(error);
        };
    };

    async getFreeWatchesByCourses(courseData: CourseModel): Promise<WatchModel[] | null> {

        console.log("getFreeWatchesByDate");

        const startDate = new Date(courseData.startDate);
        const endDate = new Date(courseData.endDate);
        const allWatches = await watchesService.getAllWatches();
        const allCourses = await coursesService.getAllCourses();

        // notInUseWatches(allWatches: WatchModel[], allCourses: CourseModel[], allSubjects: SubjectModel[]): WatchModel[] | [] {

        //     const overlapingCourses = allCourses.filter((course: CourseModel) => {

        //         startDate = new Date(startDate);
        //         endDate = new Date(endDate);

        //         const courseStartDate = new Date(course.startDate);
        //         const courseEndDate = new Date(course.endDate);
        //         const corentCourseStartDate = new Date(startDate);
        //         const corentCourseEndDate = new Date(endDate);

        //         return (
        //             (corentCourseStartDate >= courseStartDate && corentCourseStartDate <= courseEndDate) ||
        //             (corentCourseEndDate >= courseStartDate && corentCourseEndDate <= courseEndDate) ||
        //             (corentCourseStartDate <= courseStartDate && corentCourseEndDate >= courseEndDate)
        //         );
        //     });

        //     const overlapingSubjectsWatchId: string[] = []

        //     allSubjects.forEach((sub: SubjectModel) => {
        //         overlapingCourses.forEach((cur: CourseModel) => {
        //             if (sub.courseId === cur.id) {
        //                 overlapingSubjectsWatchId.push(sub.associatedWatch);
        //             }
        //         });
        //     });

        //     const resoult = allWatches.filter((watch: WatchModel) => {
        //         return !overlapingSubjectsWatchId.includes(watch.id);
        //     })

        //     return resoult;
        // }

        return null;
    }
};

const watchesService = new WatchesService();
export default watchesService;