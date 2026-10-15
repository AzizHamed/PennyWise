import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './User.js';
import { HydratedDocument, Model } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('user') private readonly userModel : Model<User>,
        private readonly logger : PinoLogger
    ){
        this.logger.setContext(UserService.name);
    }    




    async findById(id:string) : Promise<User | null> {
        this.logger.info(`Fetching user by id: ${id}`);
        const user = await this.userModel.findById(id).exec();
        this.logger.debug(`Fetched user: ${JSON.stringify(user)}`);
        return user;
    }

    async findByEmail(email:string) : Promise<HydratedDocument<User>|null>{
        this.logger.info(`Fetching user by email: ${email}`);
        const user = await this.userModel.findOne({email}).exec();
        this.logger.debug(`Fetched user: ${JSON.stringify(user)}`);
        return user;
    }

    async saveUser(user: User) : Promise<HydratedDocument<User>> {
        this.logger.info(`Saving user: ${JSON.stringify(user)}`);
        const savedUser = await this.userModel.create(user);
        this.logger.debug(`Saved user: ${JSON.stringify(savedUser)}`);
        return savedUser;
    }


    async updatePassword(id : string, newPassword : string){
        this.logger.info(`Updating password for user with id: ${id}`);
        const user = await this.userModel.findById(id).exec();
        if(!user){
            this.logger.warn(`User with id: ${id} not found`);
            throw new NotFoundException(`User with id: ${id} not found`);
        }


        user.password = newPassword;
        this.logger.debug(`Updated password for user with id: ${id}`);
        await user.save();
    }
    


    
}
