import { ValidationPipe } from '@nestjs/common';
import cookiesSession = require('cookie-session');

export const setupApp = (app: any) => {
    app.use(cookiesSession({
        keys: ['nestJs'],
    }));
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true
    }));
} 