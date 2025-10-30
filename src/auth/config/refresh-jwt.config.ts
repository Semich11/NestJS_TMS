import { registerAs } from '@nestjs/config';

export default registerAs('refresh-jwt', () =>{
  return ({
  secret: process.env.REFRESH_SECRET || 'mysecretkey',

  expiresIn: process.env.REFRESH_EXPIRE_IN as any,
})});