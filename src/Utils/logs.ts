import { push, ref } from "firebase/database";

export async function createLog(db: any, userEmail: string, actionName: string) {
    const logDataRef = ref(db, `action-log`);

    try {
        await push(logDataRef, {
            userEmail: userEmail,
            action: actionName,
            time: new Date().toJSON()
        });
    } catch (error) {
        console.error(error);
    };
};