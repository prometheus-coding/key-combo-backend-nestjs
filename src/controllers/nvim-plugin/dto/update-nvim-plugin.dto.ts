import { PartialType } from '@nestjs/mapped-types';
import { CreateNvimPluginDto } from './create-nvim-plugin.dto';

export class UpdateNvimPluginDto extends PartialType(CreateNvimPluginDto) {}
