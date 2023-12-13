import { Test, TestingModule } from '@nestjs/testing';
import { MsoidcController } from './msoidc.controller';

describe('MsoidcController', () => {
  let controller: MsoidcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MsoidcController],
    }).compile();

    controller = module.get<MsoidcController>(MsoidcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
