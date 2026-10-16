
import { Module } from '@nestjs/common';
import { AuthenticationModule } from '@nestjs/authentication';
import { AuthController } from './auth.controller.js';
import { CredintialService } from './credintial.service.js';
import { SessionAuthProvider } from './session-auth.provider.js';
import { UserModule } from '../user/user.module.js';

@Module({
  controllers: [AuthController],
  providers: [CredintialService, SessionAuthProvider],
  imports: [
    AuthenticationModule.forRoot({
      allowInMemoryStorage: true,
      session: {
        trustedOrigins: [
          'http://localhost:5173',
          process.env.FRONTEND_URL!,
        ].filter(Boolean),
      },
    }),
    UserModule,
  ],
})
export class AuthModule {}
