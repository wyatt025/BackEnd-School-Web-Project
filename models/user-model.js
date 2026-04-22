const { query } = require('../dbLogic/userDB');

const user = {
    editDetails(userId, newDetails) {
        return query(
            "UPDATE test_users SET firstname =$1, lastname =$2, email =$3, dob =$4, password =$5, username =$6 WHERE id =$7",
            [newDetails.firstname, 
                newDetails.lastname, 
                newDetails.email, 
                newDetails.dob, 
                newDetails.password, 
                newDetails.username, 
                userId]
        );
    }
}
module.exports = user;