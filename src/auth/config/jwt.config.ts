import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'mysecretkey',
  signOptions: {
    expiresIn: process.env.JWT_EXPIRE_IN as any,
  }

      

}));


