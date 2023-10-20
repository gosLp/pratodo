import { INestApplication, ValidationPipe } from '@nestjs/common';
import {Test} from '@nestjs/testing'
import { PrismaService } from '../src/prisma/prisma.service';//'src/prisma/prisma.service';
import {AppModule} from '../src/app.module';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateTodoDto, EditTodoDto } from 'src/todo/dto';

describe('App e2e', ()=>{
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async() =>{
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333')
  });
  afterAll(()=>{
    app.close();
  })
  describe('Auth', () =>{
    const dto: AuthDto ={
      email: 'test@email.com',
      password: 'test123'
    }
    describe('Signup', ()=>{
      it('should throw if email is empty', ()=>{
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password
          })
          .expectStatus(400);
      
      });
      it('should throw if email is empty', ()=>{
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email
          })
          .expectStatus(400);
      
      });
      it('should throw if no body', ()=>{
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400);
      
      });
      it('should signup', () =>{
        
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Signin', ()=>{
      it('should throw if email is empty', ()=>{
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password
          })
          .expectStatus(400);
      
      });
      it('should throw if email is empty', ()=>{
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email
          })
          .expectStatus(400);
      
      });
      it('should throw if no body', ()=>{
        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(400);
      
      });
      it('should signin', ()=>{
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt','access_token');
      });
    });
  });

  describe('User', ()=>{

    describe('Get me', ()=>{
      it('should get current user', ()=>{
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      })
    });
    describe('Edit User', ()=>{
      it('should edit user', ()=>{
        const dto: EditUserDto = {
          firstName: "Pratheek",
          email: "Prat@email.com"
        }
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      })
    });
  });

  describe('Todos', () => {

    describe('Get empty todos', ()=>{
      it('should get empty', ()=>{
        return pactum
          .spec()
          .get('/todos')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([])
      })
    })
    describe('Create Todo', () => {
      const dto :CreateTodoDto = {
        title: "Watch the cricket match",
        description: " link is https://youtu.be/qdQNfF1-2rw?si=SmPvLccQkx1dGLBz",
        status: false
      }
      it('should create todo', ()=>{
        return pactum
        .spec()
        .post('/todos')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}',
        })
        .withBody(dto)
        .expectStatus(201)
        .stores('todoId', 'id')
      })
    });
    describe('Get Todos', () => {
      it('should get todos', ()=>{
        return pactum
          .spec()
          .get('/todos')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      })
    });
    describe('Get Todo by id', ()=>{
      it('should get todo by Id', ()=>{
        return pactum
          .spec()
          .get('/todos/{id}')
          .withPathParams('id', '$S{todoId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{todoId}');
      })
    })
    describe('Get Todos by Status', () => {
      it('should get not complete todos', ()=>{
        const status = '0';
        return pactum
          .spec()
          .get('/todos')
          .withQueryParams('status', 'false')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
      })
    });
    describe('Edit Todo by id', () => {
      const dto: EditTodoDto = {
        description: "Im done with it",
        status: true,
      } 
      it('should edit todo by id', ()=>{
        return pactum
          .spec()
          .patch('/todos/{id}')
          .withBody(dto)
          .withPathParams('id', '$S{todoId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectBodyContains(dto.description)
          .expectBodyContains(dto.status)
          .expectStatus(200);
          
      })
    });
    describe('Delete Todo by id', () => { 
      it('should delete todo by id', ()=>{
        return pactum
          .spec()
          .delete('/todos/{id}')
          .withPathParams('id', '$S{todoId}')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          // .expectBodyContains(dto.description)
          // .expectBodyContains(dto.status)
          .expectStatus(204);
          
      });

      it('should get empty todos', () =>{
        return pactum
          .spec()
          .get('/todos')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(0);
      })
    });
  });
});