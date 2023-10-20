import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService){
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),  // get env variables using nestjs config service
                },
            }
        });
    }
    /**
     * Clean the database by deleting all todos and users.
     * 
     * @returns A Promise that resolves when the database is cleaned.
     */
    cleanDb(){
        return this.$transaction([
            this.todo.deleteMany(),
            this.user.deleteMany(),
        ]);
    }
}
