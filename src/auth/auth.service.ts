import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){

    }
    async signin(dto: AuthDto) {
        // find the user
        //if the user doesnt exist throw exception
    }

    async signup(dto: AuthDto) {

        // generate the password hash
        const hash = await argon.hash(dto.password);

        try {
            
            // save the new user in the db
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
            });
                // hacky solution to return without the user hash implement select on prisma or transformers
            delete user.hash;
            //return the saved user
            return user;

        } catch (error) {
           if(error instanceof PrismaClientKnownRequestError){
            if(error.code === 'P2002'){
                throw new ForbiddenException('Credentials taken');
            }
           } 
           throw error;
        }


        
    }
}



