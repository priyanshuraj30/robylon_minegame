const db = require('./database');

// Function to check if a table exists in the database
function tableExists(tableName) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [tableName], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(!!row); // Return true if row exists, false otherwise
        });
    });
}

// Export the tableExists function
module.exports = {
    tableExists
};
