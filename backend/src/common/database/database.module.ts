import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';

@Module({
    imports : [
        MongooseModule.forRootAsync({
            useFactory : (configService : ConfigService) =>({
                uri : configService.get<string>('uri')
            }),
            inject : [ConfigService]
        })
    ]
})
export class DatabaseModule {}
