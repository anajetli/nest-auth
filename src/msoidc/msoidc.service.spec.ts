import { Test, TestingModule } from '@nestjs/testing';
import { MsoidcService } from './msoidc.service';

describe('MsoidcService', () => {
  let service: MsoidcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MsoidcService],
    }).compile();

    service = module.get<MsoidcService>(MsoidcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
