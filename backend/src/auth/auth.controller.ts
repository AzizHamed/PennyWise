import { Body, Controller, Get, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { CredintialService } from './credintial.service.js';
import { CurrentUser, Public, SignInService } from '@nestjs/authentication';
import { PinoLogger } from 'nestjs-pino';
import { SignupDto } from './dtos/sign-up.dto.js';
import { User } from '../user/User.js';
import { SignInDto } from './dtos/sign-in.dto.js';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly credintialService: CredintialService,
        private readonly signInService : SignInService,
        private readonly logger : PinoLogger
    ){
        this.logger.setContext(AuthController.name);
    }

    @Public()
    @Post('signup')
    async signup(@Body() signupDto : SignupDto) : Promise<User>{
        this.logger.info('Signup attempt with data:', signupDto);
        const user = await this.credintialService.register(signupDto);
        await this.signInService.signIn(user.id, {method : 'password'});
        return user;
    }


    @Public()   
    @Post('signin')
    async signin(@Body() signinDto: SignInDto){
        this.logger.info('Signin attempt with data:', signinDto);
        const user = await this.credintialService.verify(signinDto);
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const {session} = await this.signInService.signIn(user.id, {method : 'password'});
        return session;
    }


    @Public()   
    @Post('logout')
    @HttpCode(204)
    async logout(){
        this.logger.info('Logout attempt');
       const logout =  await this.signInService.signOut();
       if(!logout){
        this.logger.warn('Logout failed');
        throw new UnauthorizedException('Logout failed');
       }
       this.logger.debug('Logout successful');

    }

    @Get('me')
    async me(@CurrentUser() user: (User & { id: string }) | null){
        this.logger.info('Fetching current user');
        if(!user){
            throw new UnauthorizedException('No current user found');
        }
        return { id: user.id, name: user.name, email: user.email, budget: user.budget };
    }
}
