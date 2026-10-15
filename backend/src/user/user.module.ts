import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './User.js';

@Module({
  providers: [UserService],
  imports : [
    MongooseModule.forFeature([{name : 'user', schema : UserSchema}])
  ],
  exports: [UserService]
})
export class UserModule {}
