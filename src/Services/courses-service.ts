import { DataSnapshot, get, push, ref, remove, set } from "firebase/database";
import { CourseModel } from "../Models/course-modal";
import { firebaseDB } from "../firebase-config";

class CoursesService {

    async getCourseByKey(key: string): Promise<CourseModel | null> {

        const coursesRef = ref(firebaseDB, `courses/${key}`);

        try {
            const courseSnapshot = await get(coursesRef);
            console.log("getCourseByKey");
            if (courseSnapshot.exists()) {
                let course = courseSnapshot.val();
                course.key = key;
                return course;

            } else {
                console.log("No courses found in the database.");
                return null;
            }

        } catch (error) {
            console.error("Error getting course by key:", error);
            throw error;
        }
    }

    async getCourseById(id: string): Promise<CourseModel | null> {

        const coursesRef = ref(firebaseDB, 'courses');
        console.log("getCourseById");
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
        console.log("getAllCourses");

        try {
            const coursesSnapshot = await get(coursesRef);

            if (coursesSnapshot.exists()) {
                const coursesList: CourseModel[] = [];

                coursesSnapshot.forEach((childSnapshot: DataSnapshot) => {
                    const course = childSnapshot.val();

                    course.key = childSnapshot.key;
                    course.startDate = new Date(course.startDate);

                    coursesList.push(course);
                });
                coursesList.sort((a: any, b: any) => b.startDate - a.startDate);
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
        console.log("addNewCourse");

        const corentCourses = await this.getAllCourses();
        console.log(corentCourses);

        let idAlreadyExist = corentCourses?.filter(course => {
            return course.id === newCourseData.id;
        });

        if (idAlreadyExist && idAlreadyExist.length > 0) {
            console.log("Id all ready in use");
            return;
        }

        const dataRef = ref(firebaseDB, 'courses/');
        const newCourseRef = push(dataRef);
        try {
            await set(newCourseRef, {
                id: newCourseData.id,
                startDate: newCourseData.startDate,
                endDate: newCourseData.endDate,
                subjects: []
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
        console.log("deleteCourseByKey");

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