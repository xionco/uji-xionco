
import bcrypt from 'bcrypt';

const cekauthor =async(headercek) =>{
    const bycriptPath="$2b$10$";
    const setBasicAuth ={
        username: 'xioncosukses',
        password :'suksesjayaxiocoselamanya1234'
    }//Basic JDJhJDEyJEYvVk1QWFc0dDIwNnJwRDR1REVuaGUzTFVrNmhtRC5lLlN2cXBEdGZ1QUhHWG1aS1NwWjNXOiQyYSQxMiRPOFFSc2V2bEZCcVZ4dG43ZGRHbC5lYXBwenFHQ2liRkdOMlpUUmRqYTQzMXBqalRtQ0NDSw==

    const getauthorization = headercek;
    if(!getauthorization){
        return false;
    }
    const encoded = getauthorization.substring(6);
    const decoded =Buffer.from(encoded,'base64').toString('ascii');
    const [userauth,passauth]=decoded.split(':');
    /* console.log({
        userauth:userauth,
        passauth:passauth
    }) */
    const cekuserAuth = await bcrypt.compare(setBasicAuth.username, userauth);
    const cekpassAuth = await bcrypt.compare(setBasicAuth.password, passauth);
    if (cekuserAuth!= true||cekpassAuth!= true) {
        return false;
    }
    return true;
    
}

export default cekauthor;