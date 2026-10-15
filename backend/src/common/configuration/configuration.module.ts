import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as z from 'zod';

@Module({
  imports : [ConfigModule.forRoot({
    envFilePath : process.env.NODE_ENV === 'dev' ? '.dev.env' : process.env.NODE_ENV === 'test' ? '.test.env' : '.prod.env',
    validationSchema : z.object({
        uri : z.string()
    }),
    isGlobal: true
  })],
})
export class ConfigurationModule {}
