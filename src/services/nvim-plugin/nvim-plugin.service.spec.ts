import { Test, TestingModule } from '@nestjs/testing';
import { NvimPluginService } from './nvim-plugin.service';

describe('NvimPluginService', () => {
  let service: NvimPluginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NvimPluginService],
    }).compile();

    service = module.get<NvimPluginService>(NvimPluginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
