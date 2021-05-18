// NOTES : Follow https://oracle.github.io/node-oracledb/INSTALL.html#instosx
// STEP 1 :
// cd $HOME/Downloads
// curl -O https://download.oracle.com/otn_software/mac/instantclient/198000/instantclient-basic-macos.x64-19.8.0.0.0dbru.dmg
// hdiutil mount instantclient-basic-macos.x64-19.8.0.0.0dbru.dmg
// /Volumes/instantclient-basic-macos.x64-19.8.0.0.0dbru/install_ic.sh
// hdiutil unmount /Volumes/instantclient-basic-macos.x64-19.8.0.0.0dbru

// STEP 2 : Add to package.json
// "scripts": {
//     "postinstall": "ln -s $HOME/Downloads/instantclient_19_8/libclntsh.dylib $(npm root)/oracledb/build/Release"
// },
// Run "npm i"

// STEP 3 : type "hostname"
// add entry "127.0.0.1      hostname" in /etc/hosts

const oracledb = require("oracledb");

const callFunc = async () => {
    console.log('Function started...................'); 
    try {
        this.connection = await oracledb.getConnection({
            user: 'qatest',
            password: 'qatest',
            port: '1521',
            connectString: '127.0.0.1/xe'
        })
        console.log('Connection Established!!!!!!!!!!!!!!!!!!!!!!!');
        await runQueries();
    } catch (err) {
        console.log('Connection failed to establish!!!!!!!!!!!!!!!!!!!!!!!');
        console.error(err);
    }  
    console.log('Function Ended...................');
};

const runQueries = async () => {
    try {

        let sql, binds, options, result;
    
        //
        // Create a table
        //
    
        const stmts = [
          `DROP TABLE no_example`,
    
          `CREATE TABLE no_example (id NUMBER, data VARCHAR2(20))`
        ];
    
        for (const s of stmts) {
          try {
            await this.connection.execute(s);
          } catch (e) {
            if (e.errorNum != 942)
              console.error(e);
          }
        }
    
        //
        // Insert three rows
        //
    
        sql = `INSERT INTO no_example VALUES (:1, :2)`;
    
        binds = [
          [101, "Alpha" ],
          [102, "Beta" ],
          [103, "Gamma" ]
        ];
    
        // For a complete list of options see the documentation.
        options = {
          autoCommit: true,
          // batchErrors: true,  // continue processing even if there are data errors
          bindDefs: [
            { type: oracledb.NUMBER },
            { type: oracledb.STRING, maxSize: 20 }
          ]
        };
    
        result = await this.connection.executeMany(sql, binds, options);
    
        console.log("Number of rows inserted:", result.rowsAffected);
    
        //
        // Query the data
        //
    
        sql = `SELECT * FROM no_example`;
    
        binds = {};
    
        // For a complete list of options see the documentation.
        options = {
          outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
          // extendedMetaData: true,               // get extra metadata
          // prefetchRows:     100,                // internal buffer allocation size for tuning
          // fetchArraySize:   100                 // internal buffer allocation size for tuning
        };
    
        result = await this.connection.execute(sql, binds, options);
    
        console.log("Metadata: ");
        console.dir(result.metaData, { depth: null });
        console.log("Query results: ");
        console.dir(result.rows, { depth: null });
    
        //
        // Show the date.  The value of ORA_SDTZ affects the output
        //
    
        sql = `SELECT TO_CHAR(CURRENT_DATE, 'DD-Mon-YYYY HH24:MI') AS CD FROM DUAL`;
        result = await this.connection.execute(sql, binds, options);
        console.log("Current date query results: ");
        console.log(result.rows[0]['CD']);
    
      } catch (err) {
        console.error(err);
      } finally {
        if (this.connection) {
          try {
            await this.connection.close();
          } catch (err) {
            console.error(err);
          }
        }
      }
};
callFunc();