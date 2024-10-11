import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { DataEncryption } from './data-encryption';

@Injectable()
export class EncryptionInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    if (request.body.data) {
      const decryptedData = DataEncryption().decrypt(request.body.data);
      request.body = decryptedData;
    }

    const now = Date.now();
    return next
      .handle()
      .pipe(
        map((response) => {
          const { data } = response;
          const encryptedData = DataEncryption().encrypt(data);
          response.data = encryptedData;
          return response;
        }),
      )
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
