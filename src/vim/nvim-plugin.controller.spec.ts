import { Test, TestingModule } from '@nestjs/testing';
import { NvimPluginController } from './nvim-plugin.controller';
import { NvimPluginService } from 'src/vim/nvim-plugin.service';

describe('NvimPluginController', () => {
  let controller: NvimPluginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NvimPluginController],
      providers: [NvimPluginService],
    }).compile();

    controller = module.get<NvimPluginController>(NvimPluginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
