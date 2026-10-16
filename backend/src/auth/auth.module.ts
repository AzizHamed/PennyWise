import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@nestjs/authentication';
import { AuthController } from './auth.controller.js';
import { CredintialService } from './credintial.service.js';
import { SessionAuthProvider } from './session-auth.provider.js';
import { UserModule } from '../user/user.module.js';

@Module({
  controllers: [AuthController],
  providers: [CredintialService, SessionAuthProvider],
  imports : [AuthenticationModule.forRoot({
    allowInMemoryStorage : true,
    session : {
      trustedOrigins : ['http://localhost:5173', 'https://pennywise-2-p8rm.onrender.com/']
    }
  }), UserModule]
})
export class AuthModule {}
