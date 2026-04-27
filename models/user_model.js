const { query } = require('../dbLogic/userDB');

const user = {
    editDetails(userId, newDetails) {
        // Gets the keys that actually have data
        const keys = Object.keys(newDetails).filter(key => 
            newDetails[key] !== undefined && newDetails[key] !== null
        );
    
        if (keys.length === 0) return; // Nothing to update

        // Builds the "column = $index" string dynamically
        // Use .toLowerCase() to match PostgreSQL column naming standards
        const setClause = keys
            .map((key, index) => `${key.toLowerCase()} = $${index + 1}`)
            .join(", ");
    
        // Collect the values in the same order
        const values = keys.map(key => newDetails[key]);
    
        // Add the userId as the last parameter for the WHERE clause
        values.push(userId);
        const sql = `UPDATE test_users SET ${setClause} WHERE id = $${values.length}`;

        // Execute the query 
        return query(sql, values);
    }
}
module.exports = user;