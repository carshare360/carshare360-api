import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user || request?.user?.blacklisted) {
      return null;
    }
    
    return request.user;

  }
);