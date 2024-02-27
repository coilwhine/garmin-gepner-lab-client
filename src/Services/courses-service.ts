import { DataSnapshot, get, push, ref, remove, set } from "firebase/database";
import { CourseModel } from "../Models/course-modal";
import { firebaseDB } from "../firebase-config";

class CoursesService {

    async getCourseById(id: string): Promise<CourseModel | null> {

        const coursesRef = ref(firebaseDB, 'courses');

        try {
            const usersSnapshot = await get(coursesRef);

            if (usersSnapshot.exists()) {

                usersSnapshot.forEach((childSnapshot: DataSnapshot) => {
                    const course = childSnapshot.val();
                    if (course.id === id) {
                        course.key = childSnapshot.key;
                        console.log(course);
                        return course;
                    }
                });

                return null;

            } else {
                console.log("No courses found in the database.");
                return null;
            }

        } catch (error) {
            console.error("Error getting course by id:", error);
            throw error;
        }
    }

    async getAllCourses(): Promise<CourseModel[] | null> {

        const coursesRef = ref(firebaseDB, 'courses');

        try {
            const coursesSnapshot = await get(coursesRef);

            if (coursesSnapshot.exists()) {
                const coursesList: CourseModel[] = [];

                coursesSnapshot.forEach((childSnapshot: DataSnapshot) => {
                    const course = childSnapshot.val();

                    course.key = childSnapshot.key;
                    coursesList.push(course);
                });

                return coursesList

            } else {
                console.log("No courses found in the database.");
                return null;
            }
        } catch (error) {
            console.error("Error getting courses:", error);
            throw error;
        }
    }

    async addNewCourse(newCourseData: CourseModel): Promise<void> {

        const corentCourses = await this.getAllCourses();
        console.log(corentCourses);

        let idAlreadyExist = corentCourses?.filter(course => {
            return course.id === newCourseData.id;
        });

        if (idAlreadyExist[0]) {
            console.log(idAlreadyExist);
            console.log("Id all ready in use");
            return;
        }

        const dataRef = ref(firebaseDB, 'courses/');
        const newCourseRef = push(dataRef);
        try {
            await set(newCourseRef, {
                id: newCourseData.id,
                startDate: newCourseData.startDate,
                endDate: newCourseData.endDate
            })

            console.log("Data added successfully with key:", newCourseRef.key);
            return;

        } catch (error) {
            console.error("Error adding data:", error);
            throw error;
        };
    }

    async deleteCourseByKey(courseKey: string): Promise<void> {
        const dataRef = ref(firebaseDB, `courses/${courseKey}`);

        try {
            await remove(dataRef);
            console.log("Data deleted successfully!");
            return;

        } catch (error) {
            console.error("Error deleting data: ", error);
        };
    }

}

const coursesService = new CoursesService();
export default coursesService;