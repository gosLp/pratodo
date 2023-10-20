import{
    createParamDecorator,
    ExecutionContext,
} from "@nestjs/common";

// Get user id or user in request.user made easier using nestjs meta programming
export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext)=>{
        const request = ctx
            .switchToHttp()
            .getRequest();
        if(data){
            return request.user[data];
        }
        return request.user;
    },
)