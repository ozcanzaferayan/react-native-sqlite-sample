import React, {useEffect} from 'react';
import SQLite, {SQLiteDatabase, ResultSet} from 'react-native-sqlite-storage';

const App = () => {
  let db: SQLiteDatabase;

  useEffect(() => {
    SQLite.enablePromise(true);
    SQLite.openDatabase({name: 'rnSqliteSample.db', location: 'Documents'})
      .then(dbRes => {
        console.log('Database opened.');
        db = dbRes;
      })
      .catch(e => console.log(e));
  }, []);
  return <></>;
};

export default App;
