import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    console.log('This is intercepting request');
    console.log({ context });

    return handler.handle().pipe(
      map((data) => {
        console.log('This is intercepting response');
        console.log({ data });

        const response = {
          ...data,
          timestamp: Date.now(),
        };

        return response;
      }),
    );
  }
}
