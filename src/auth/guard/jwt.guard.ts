import {AuthGuard} from "@nestjs/passport";
// define our jwtGaurd that makes sure every route or controller that implements this needs jwt verification
// using passport library
export class JwtGuard extends AuthGuard('jwt'){
    constructor(){
        super();
    }
}