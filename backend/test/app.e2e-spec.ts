import { strict as assert } from 'assert';
import { describe, it, before, after } from 'node:test';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  before(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  after(async () => {
    await app.close();
  });

  it('GET / should return Hello World!', async () => {
    const response = await request(app.getHttpServer()).get('/');
    assert.equal(response.status, 200);
    assert.equal(response.text, 'Hello World!');
  });
});
