declare const module: any;
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './utils/all-exception.filter';
import { EncryptionInterceptor } from './utils/encryption.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1', {
    exclude: ['/'],
  });
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  await app.listen(4000);
  app.useGlobalFilters(new AllExceptionFilter(app.get(HttpAdapterHost)));
  app.useGlobalInterceptors(new EncryptionInterceptor());
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
