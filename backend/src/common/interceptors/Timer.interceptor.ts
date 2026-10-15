// import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
// import { PinoLogger } from "nestjs-pino";
// import { Observable } from "rxjs";

// @Injectable()
// export class TimerInterceptor implements NestInterceptor{
//     constructor(
//         private readonly logger: PinoLogger
//     ){
//         this.logger.setContext(TimerInterceptor.name);
//     }
//     intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
//         const now = Date.now();
        

//     }

// }