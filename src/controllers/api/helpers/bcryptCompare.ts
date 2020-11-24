import bcrypt from 'bcryptjs';


export const bcryptCompare = async (userPswd: string, userDBPswd: string) => {
      const compared = await bcrypt.compare(userPswd, userDBPswd);
    return compared;
  }