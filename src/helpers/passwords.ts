
import bcrypt from 'bcrypt';

export const comparePassword = async (password:string, recivedPassword:string) => {
    return await bcrypt.compare(recivedPassword, password)
}

export const encryptPassword = async (password:string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}