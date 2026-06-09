import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { setupApp } from '../src/setup-app';
import { DataSource } from 'typeorm';

describe('Auth Controller (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        const dataSource = app.get(DataSource);

        await dataSource.synchronize(true);
    });

    it('handles register', () => {
        return request(app.getHttpServer())
            .post('/auth/register')
            .send({
                name: "admin112",
                email: "admin11241@gmail.com",
                password: "password"
            })
            .expect(201)
            .then(({ body }: request.Response) => {
                expect(body.id).toBeDefined();
                expect(body.name).toBe("admin112");
                expect(body.email).toBe("admin11241@gmail.com");
            })
    });

    it('logged in after register', async () => {
        const email = "admin11241@gmail.com";
        const response = await request(app.getHttpServer()
        ).post('/auth/register')
            .send({
                name: "admin112",
                email,
                password: "password"
            }).expect(201);

        const cookie = response.get('Set-Cookie');
        const { body } = await request(app.getHttpServer())
            .get('/auth/whoami')
            .set('Cookie', cookie)
            .expect(200);

        expect(body.email).toEqual(email);
    })

    afterEach(async () => {
        await app.close();
    });
});
