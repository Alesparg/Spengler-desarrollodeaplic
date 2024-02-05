import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

let db;

const createTableQuery = 'CREATE TABLE IF NOT EXISTS sessionUser (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, idToken TEXT NOT NULL)';

if (Platform.OS === 'web') {
  const localforage = require('localforage');
  db = localforage.createInstance({
    name: 'session',
  });
} else {
  db = SQLite.openDatabase('session.db');
}

export const init = async () => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'web') {
      // Operaciones de inicialización para web
      // Aquí debes adaptar tu código para la plataforma web
      resolve();
    } else {
      // Operaciones de inicialización para otras plataformas con SQLite
      db.transaction(
        (tx) => {
          tx.executeSql(createTableQuery, []);
        },
        (error) => {
          console.error('Error during database initialization:', error);
          reject(error);
        },
        () => resolve()
      );
    }
  });
};

export const insertSession = ({ localId, email, idToken }) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'web') {
      // Operaciones para web
      // Aquí debes adaptar tu código para la plataforma web
    } else {
      // Operaciones para otras plataformas con SQLite
      db.transaction(
        (tx) => {
          tx.executeSql(
            'INSERT INTO sessionUser (localId, email, idToken) VALUES (?, ?, ?);',
            [localId, email, idToken],
            (_, result) => resolve(result),
            (_, err) => reject(err)
          );
        },
        (error) => {
          console.error('Error during transaction:', error);
          reject(error);
        }
      );
    }
  });
};

// Resto de las funciones también ajustadas de manera similar...

// ...


export const fechSession = () => {
  return new Promise((resolve, reject) => {
    db.readTransaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM sessionUser',
          [],
          (_, result) => resolve(result),
          (_, err) => reject(err)
        );
      },
      (error) => {
        console.error('Error during read transaction:', error);
        reject(error);
      }
    );
  });
};

export const deleteAllSession = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'DELETE FROM sessionUser',
          [],
          (_, result) => resolve(result),
          (_, err) => reject(err)
        );
      },
      (error) => {
        console.error('Error during transaction:', error);
        reject(error);
      }
    );
  });
};
