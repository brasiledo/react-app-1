import { db, auth } from './firebaseConfig';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { async } from 'validate.js';
import SimpleToast from 'react-native-root-toast';
import storage from '@react-native-firebase/storage';

export async function saveData(collection, doc, jsonObject) {
  await db
    .collection(collection)
    .doc(doc)
    .set(jsonObject, { merge: true })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
}
export async function updateArrayObjectKey(collectionName, documentId, arrayFieldName, indexToUpdate, keyToUpdate, newValue) {

  const documentRef = db.collection(collectionName).doc(documentId);

  return documentRef.get()
    .then((doc) => {
      if (doc.exists) {
        const dataArray = doc.data()[arrayFieldName];
        const objectToUpdate = dataArray[indexToUpdate];

        // Update the specific key within the object
        objectToUpdate[keyToUpdate] = newValue;

        return documentRef.update({ [arrayFieldName]: dataArray });
      } else {
        throw new Error('Document does not exist.');
      }
    })
    .then(() => {
      console.log('Array object key updated successfully.');
    })
    .catch((error) => {
      console.error('Error updating array object key:', error);
    });
}

export async function saveDataWithInCollections(
  collection,
  id,
  doc,
  jsonObject,
) {
  await db
    .collection(collection)
    .doc(id)
    .collection('userBudget')
    .doc(doc)
    .set(jsonObject)
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
}
export async function saveDataWithoutDocId(collection, jsonObject) {
  let docRef = await db.collection(collection).doc();
  docRef.set(jsonObject);
  return docRef;
}
export async function saveDataWithPush(collection, doc, jsonObject) {
  let docRef = await db.collection(collection);
  docRef.add(jsonObject);
  return docRef;
}
export async function forgotPassword(Email, navigation) {
  auth
    .sendPasswordResetEmail(Email)
    .then(function (user) {
      SimpleToast.show('Please check your email...');
      navigation ? navigation.navigate('SignInScreen') : null;
    })
    .catch(function (e) {
      SimpleToast.show(e);
    });
}
export async function addToArray(collection, doc, array, value) {
  let docRef = await db.collection(collection).doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array] != undefined) {
    docRef.update({
      [array]: firebase.firestore.FieldValue.arrayUnion(value),
    });
  } else {
    saveData(collection, doc, { [array]: [value] });
  }
}

export async function getAllOfCollection(collection) {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      //console.log(doc.data());
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}

export function getData(collection, doc, objectKey) {
  // check if data exists on the given path
  if (objectKey === undefined) {
    return db
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          return false;
        }
      });
  } else {
    return db
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists && doc.data()[objectKey] != undefined) {
          return doc.data()[objectKey];
        } else {
          return false;
        }
      });
  }
}
export async function removeItemfromArray(collection, doc, array, index) {
  let docRef = await db.collection(collection).doc(doc);
  let docData = await docRef.get();

  if (docData.exists && docData.data()[array][index] != undefined) {
    docRef.update({
      [array]: firebase.firestore.FieldValue.arrayRemove(
        docData.data()[array][index],
      ),
    });
  }
}

export async function addToArrayUpdate(collection, doc, array, value) {
  let docRef = await db.collection(collection).doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array] != undefined) {
    docRef.set({
      [array]: firebase.firestore.FieldValue.arrayUnion(value),
    });
  }
}

export async function updateArray(collection, doc, array, value, index) {
  let docRef = await db.collection(collection).doc(doc);
  let docData = await docRef.get();

  if (docData.exists && docData.data()[array][index] != undefined) {
    docRef
      .update({
        [array]: firebase.firestore.FieldValue.arrayRemove(
          docData.data()[array][index],
        ),
      })
      .then(async () => {
        let docRef1 = await db.collection(collection).doc(doc);
        let docData1 = await docRef1.get();
        if (docData1.exists && docData1.data()[array] != undefined) {
          docRef1.update({
            [array]: firebase.firestore.FieldValue.arrayUnion(value),
          });
        }
      });
  }
}

export async function getDocByKeyValue(collection, key, value) {
  let data = [];
  let querySnapshot = await db
    .collection(collection)
    .where(key, '==', value)
    .get();
  await querySnapshot.forEach(function (doc) {
    // console.log('doc id=>',doc.id)
    data.push(doc.data());
  });
  return data;
}
export async function getDocByKeyValueOR(collection, key, value) {
  let data = [];
  let querySnapshot = await db
    .collection(collection)
    .where(key, 'in', value)
    .get();
  await querySnapshot.forEach(function (doc) {
    // console.log('doc id=>',doc.id)
    data.push(doc.data());
  });
  return data;
}

export async function deleteDoc(collection, doc) {
  let db = firebase.firestore();
  await db
    .collection(collection)
    .doc(doc)
    .delete()
    .catch(function (error) {
      console.error('Error removing document: ', error);
    });
}

export async function uploadGalleryImages(uri, name, folderName) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref =
      storage()
        .ref(folderName + name);
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        () => { },
        err => {
          reject(err);
        },

        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url);
        },
      );
    });
  } catch (err) {
    console.log('uploadImage error: ' + err.message);
  }
}
export async function uploadProfileImage(uri, name) {
  try {
    const storageRef = storage().ref(name);
    await storageRef.putFile(uri, { contentType: 'image/jpeg' });

    const url = await storageRef.getDownloadURL();
    return url;
  } catch (err) {
    console.log('uploadImage error: ' + err.message);
    throw err;
  }
}

export function uniqueID() {
  // this.setState({indicator: true});
  function chr4() {
    return Math.random()
      .toString(16)
      .slice(-4);
  }
  return (
    chr4() +
    chr4() +
    '-' +
    chr4() +
    '-' +
    chr4() +
    '-' +
    chr4() +
    '-' +
    chr4() +
    chr4() +
    chr4()
  );
}
