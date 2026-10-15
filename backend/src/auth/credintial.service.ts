import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../user/user.service.js";
import { PasswordHasher } from "@nestjs/authentication";
import { PinoLogger } from "nestjs-pino";
import { SignupDto } from "./dtos/sign-up.dto.js";
import { User } from "../user/User.js";
import { SignInDto } from "./dtos/sign-in.dto.js";
import { th } from "zod/locales";
import { HydratedDocument } from "mongoose";

@Injectable()
export class CredintialService{
constructor(
private readonly userService :UserService,
private readonly passwordHasher : PasswordHasher,
private readonly logger : PinoLogger
){

    this.logger.setContext(CredintialService.name);
}


async register(signupDto : SignupDto) : Promise<HydratedDocument<User>>{
    this.logger.info("Registering new user with email: " + signupDto.email);
    const userByEmail = await this.userService.findByEmail(signupDto.email);
    if(userByEmail){
        this.logger.warn(`User with this email :  ${signupDto.email} already exists`);
        throw new ConflictException("User with this email already exists");
    }

    const user = await this.userService.saveUser({
        email: signupDto.email,
        password: await this.passwordHasher.hash(signupDto.password),
        name: signupDto.name,
        budget: signupDto.budget,
    })

    this.logger.debug("New user registered with email: " + user.email);
    return user;

}

async verify(signInDto : SignInDto): Promise<HydratedDocument<User> | null>{
    this.logger.info("Verifying user with email: " + signInDto.email);
    const user = await this.userService.findByEmail(signInDto.email);
    if(!user){
        this.logger.warn(`User with this email :  ${signInDto.email} not found`);
        throw new NotFoundException(`User with this email :  ${signInDto.email} not found`);
    }

    const isValidPassword = await this.passwordHasher.verify(signInDto.password, user.password);

    if(!isValidPassword){
        this.logger.warn(`Invalid password for user with email: ${signInDto.email}`);
        return null;
    }


    if(this.passwordHasher.needsRehash(user.password)){
        const id = user.id;    
        await this.userService.updatePassword(id, await this.passwordHasher.hash(signInDto.password));
    }
    return user;
}
}