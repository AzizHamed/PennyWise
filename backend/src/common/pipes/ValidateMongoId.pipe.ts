import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class ValidateMongoIdPipe implements PipeTransform{
    transform(value: string, metadata: ArgumentMetadata) {
        if(!Types.ObjectId.isValid(value)){
            throw new BadRequestException("Invalid Mongo ID");
        }

        return value;
    }

}