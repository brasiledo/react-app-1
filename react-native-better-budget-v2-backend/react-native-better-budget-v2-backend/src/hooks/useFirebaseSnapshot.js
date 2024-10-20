import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Budget } from '../assets/svgs';

const useFirebaseSnapshot = (collectionPath, docID, dispatch, setMethod) => {

    useEffect(() => {
        let unsubscribe;

        const fetchData = async () => {

            unsubscribe = firestore()
                .collection(collectionPath)
                .doc(docID)
                .onSnapshot((snapshot) => {
                    const data = snapshot.data()
                    dispatch(Budget(data))
                });
        }




        fetchData();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [collectionPath, docID, dispatch, setMethod]);

    // return { data, loading };
};

export default useFirebaseSnapshot;
