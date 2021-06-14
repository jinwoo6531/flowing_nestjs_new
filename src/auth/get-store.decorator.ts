import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Store } from './entities/store.entity';

export const GetStore = createParamDecorator(
  (_data, ctx: ExecutionContext): Store => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
