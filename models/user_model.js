const { query } = require('../dbLogic/userDB');

const user = {
    editDetails(userId, newDetails) {
        // 1. Get the keys that actually have data
        const keys = Object.keys(newDetails).filter(key => 
            newDetails[key] !== undefined && newDetails[key] !== null
        );
    
        if (keys.length === 0) return; // Nothing to update

        // 2. Build the "column = $index" string dynamically
        // Use .toLowerCase() to match PostgreSQL column naming standards
        const setClause = keys
            .map((key, index) => `${key.toLowerCase()} = $${index + 1}`)
            .join(", ");
    
        // 3. Collect the values in the same order
        const values = keys.map(key => newDetails[key]);
    
        // 4. Add the userId as the last parameter for the WHERE clause
        values.push(userId);
        const sql = `UPDATE test_users SET ${setClause} WHERE id = $${values.length}`;

        // 5. Execute the query using your pg pool/client
        return query(sql, values);
    }
}
module.exports = user;