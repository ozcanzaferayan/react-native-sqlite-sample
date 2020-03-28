import React, {useEffect} from 'react';
import SQLite, {SQLiteDatabase, ResultSet} from 'react-native-sqlite-storage';

const App = () => {
  let db: SQLiteDatabase;

  useEffect(() => {
    SQLite.enablePromise(true);
    SQLite.openDatabase({name: 'rnSqliteSample.db', location: 'Documents'})
      .then(dbRes => {db = dbRes; dbOpened();})
      .catch(e => genericError(e));
  }, []);

  const genericError = (e: any) => {
    console.warn('Error: ' + JSON.stringify(e));
  };

  const dbOpened = () => {
    console.log('Creating table...');
    db.executeSql(
      `CREATE TABLE EMPLOYEE(
        ID INT PRIMARY KEY     NOT NULL,
        NAME           TEXT    NOT NULL,
        AGE            INT     NOT NULL,
        COUNTRY        CHAR(50),
        SALARY         REAL
      );`,
    )
      .then(result => tableCreated(result))
      .catch(e => {
        genericError(e);
        dropTable(db);
      });
  };

  const tableCreated = (result?: [ResultSet]) => {
    console.log('Inserting records...');
    db.executeSql(
      `INSERT INTO EMPLOYEE VALUES
        (1, '👩🏻', 32, '🇹🇷 ', 20000.00 ),
        (2, '🧑🏼', 25, '🇺🇸 ', 15000.00 ),
        (3, '👩🏻‍🦰', 23, '🇬🇧 ', 20000.00 ),
        (4, '👨🏻', 25, '🇫🇷 ', 65000.00 ),
        (5, '👩🏼‍🦱', 27, '🇩🇪 ', 85000.00 ),
        (6, '🧔🏻', 22, '🇮🇹 ', 45000.00 )
      ;`,
    )
      .then(result => recordsInserted(result))
      .catch(e => {
        genericError(e);
      });
  };

  const dropTable = (db: SQLiteDatabase) => {
    console.log('Dropping table...');
    db.executeSql(`DROP TABLE EMPLOYEE;`)
      .then(result => dbOpened())
      .catch(e => {
        genericError(e);
      });
  };

  const recordsInserted = (result?: [ResultSet]) => {
    console.log('Selecting records...');
    db.executeSql(`SELECT * FROM EMPLOYEE;`)
      .then(result => recordsSelected(result))
      .catch(e => {
        genericError(e);
      });
  };


  const recordsSelected = (result?: [ResultSet]) => {
    console.log('Displaying records...');
    result?.[0].rows.raw().forEach((v, i) => console.info(v));
    const index = 1;
    const recordAtIndex = result?.[0].rows.item(index);
    console.info(`Record at Index ${index}: ${JSON.stringify(recordAtIndex)}`);
    deleteRecord(recordAtIndex.ID);
  };

  const deleteRecord = (id: number) => {
    console.log(`Deleting record ID: ${id}...`);
    db.executeSql(`DELETE FROM EMPLOYEE WHERE ID=${id};`)
      .then(result => recordDeleted(result))
      .catch(e => {
        genericError(e);
      });
  };

  const recordDeleted = (result?: [ResultSet]) => {
    console.log('Selecting records...');
    db.executeSql(`SELECT * FROM EMPLOYEE;`)
      .then(result => receordsSelectedAfterDeletion(result))
      .catch(e => {
        genericError(e);
      });
  };

  const receordsSelectedAfterDeletion = (
    result?: [ResultSet],
  ) => {
    console.log('Displaying records...');
    result?.[0].rows.raw().forEach((v, i) => console.info(v));
  };

  return <></>;
};

export default App;
