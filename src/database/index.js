import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

let db;

if (Platform.OS === 'web') {
  // Implementar una solución para web, por ejemplo, usar IndexedDB
  // Aquí, podrías utilizar una biblioteca como "localforage" para simplificar el uso de IndexedDB
  // npm install localforage
  const localforage = require('localforage');
  db = localforage.createInstance({
    name: 'session',
  });
} else {
  // Utilizar expo-sqlite en entornos nativos de Expo
  db = SQLite.openDatabase('session.db');
}

export const init = () =>{
    const promise = new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS sessionUser (localId TEXT PRIMARY KEY NOT NULL,email TEXT NOT NULL,idToken TEXT NOT NULL)',
                [],
                ()=> resolve(),
                (_,err)=>reject(err)
            )
           
        })
    })
    return promise

}

export const insertSession = ({localId,email,idToken}) =>{
    const promise = new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql(
                'INSERT INTO sessionUser (localId,email,idToken) VALUES (?,?,?);',
                [localId,email,idToken],
                (_,result)=> resolve(result),
                (_,err)=>reject(err)
            )
           
        })
    })
    return promise

}

export const fechSession = () =>{
    const promise = new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql(
                'SELECT * FROM sessionUser',
                [],
                (_,result)=> resolve(result),
                (_,err)=>reject(err)
            )
           
        })
    })
    return promise

}


export const deleteAllSession = () =>{
    const promise = new Promise((resolve,reject)=>{
        db.transaction((tx)=>{
            tx.executeSql(
                'DELETE FROM sessionUser',
                [],
                (_,result)=> resolve(result),
                (_,err)=>reject(err)
            )
           
        })
    })
    return promise

}

