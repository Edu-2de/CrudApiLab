const bcrypt = require('bcryptjs');

const generateHash = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    console.log(`Password: ${password} -> Hash: ${hash}`);
};

generateHash('admin123'); 
generateHash('employee123'); 
generateHash('user123');  