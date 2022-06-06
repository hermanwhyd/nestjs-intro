import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, headers, query } = request;

    const queryStr = JSON.stringify(query);
    const headersStr = JSON.stringify(headers);

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${ip} :: ${method} ${url} [${queryStr}] [${headersStr}] => ${statusCode} ${contentLength}`,
      );
    });

    next();
  }
}
