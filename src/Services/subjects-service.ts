import { DataSnapshot, get, push, ref, remove, set } from "firebase/database";
import { firebaseDB } from "../firebase-config";
import { SubjectModel } from "../Models/subject-modal";

class SubjectsService {

    async getSubjectByKey(key: string): Promise<SubjectModel | null> {

        const subjectsRef = ref(firebaseDB, `subjects/${key}`);

        try {
            const subjectSnapshot = await get(subjectsRef);

            if (subjectSnapshot.exists()) {
                return subjectSnapshot.val();

            } else {
                console.log("No subjects found in the database.");
                return null;
            }

        } catch (error) {
            console.error("Error getting subject by key:", error);
            throw error;
        }
    }

    async getSubjectById(id: string): Promise<SubjectModel | null> {

        const subjectsRef = ref(firebaseDB, 'subjects');

        try {
            const subjectsSnapshot = await get(subjectsRef);

            if (subjectsSnapshot.exists()) {

                subjectsSnapshot.forEach((childSnapshot: DataSnapshot) => {
                    const subject = childSnapshot.val();
                    if (subject.id === id) {
                        subject.key = childSnapshot.key;
                        console.log(subject);
                        return subject;
                    }
                });

                return null;

            } else {
                console.log("No subjectes found in the database.");
                return null;
            }

        } catch (error) {
            console.error("Error getting subject by id:", error);
            throw error;
        }
    }

    async getAllsubjects(): Promise<SubjectModel[] | null> {

        const subjectsRef = ref(firebaseDB, 'subjects');

        try {
            const subjectsSnapshot = await get(subjectsRef);

            if (subjectsSnapshot.exists()) {
                const subjectsList: SubjectModel[] = [];

                subjectsSnapshot.forEach((childSnapshot: DataSnapshot) => {
                    const subject = childSnapshot.val();

                    subject.key = childSnapshot.key;

                    subjectsList.push(subject);
                });
                subjectsList.sort((a: any, b: any) => {

                    if (a.id < b.id) {
                        return -1;
                    }
                    if (a.id > b.id) {
                        return 1;
                    }
                });

                return subjectsList;

            } else {
                console.log("No subjects found in the database.");
                return null;
            }
        } catch (error) {
            console.error("Error getting subjects:", error);
            throw error;
        }
    }

    async addNewSubject(newSubjectData: SubjectModel): Promise<void> {

        const corentSubjects = await this.getAllsubjects();
        console.log(corentSubjects);

        let idAlreadyExist = corentSubjects?.filter(subject => {
            return subject.id === newSubjectData.id;
        });

        if (idAlreadyExist && idAlreadyExist.length > 0) {
            console.log("Id all ready in use");
            return;
        }

        const dataRef = ref(firebaseDB, 'subjects/');
        const newSubjectRef = push(dataRef);
        try {
            await set(newSubjectRef, {
                id: newSubjectData.id,
                startDate: newSubjectData.associatedClock
            });

            console.log("Data added successfully with key:", newSubjectRef.key);
            return;

        } catch (error) {
            console.error("Error adding data:", error);
            throw error;
        };
    }

    async deleteSubjectByKey(subjectKey: string): Promise<void> {
        const dataRef = ref(firebaseDB, `subjects/${subjectKey}`);

        try {
            await remove(dataRef);
            console.log("Data deleted successfully!");
            return;

        } catch (error) {
            console.error("Error deleting data: ", error);
        };
    }

}

const subjectsService = new SubjectsService();
export default subjectsService;