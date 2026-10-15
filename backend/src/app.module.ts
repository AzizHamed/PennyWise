import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserModule } from './user/user.module.js';
import { ExpenseModule } from './expense/expense.module.js';
import { DatabaseModule } from './common/database/database.module.js';
import { PinoLoggerModule } from './common/pino-logger/pino-logger.module.js';
import { ConfigurationModule } from './common/configuration/configuration.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [UserModule, ExpenseModule, DatabaseModule, PinoLoggerModule, ConfigurationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
