import { DataSnapshot, get, push, ref, remove, set } from "firebase/database";
import { firebaseDB } from "../firebase-config";
import { WatchModel } from "../Models/watch-modal";

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

    async addNewWatch(newWatchData: WatchModel): Promise<void> {

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
                id: newWatchData.id
            });

            console.log("Data added successfully with key:", newWatchRef.key);
            return;

        } catch (error) {
            console.error("Error adding data:", error);
            throw error;
        };
    };

    async deleteWatchByKey(watchtKey: string): Promise<void> {
        const dataRef = ref(firebaseDB, `watches/${watchtKey}`);
        console.log("deleteWatchByKey");

        try {
            await remove(dataRef);
            console.log("Data deleted successfully!");
            return;

        } catch (error) {
            console.error("Error deleting data: ", error);
        };
    };
};

const watchesService = new WatchesService();
export default watchesService;