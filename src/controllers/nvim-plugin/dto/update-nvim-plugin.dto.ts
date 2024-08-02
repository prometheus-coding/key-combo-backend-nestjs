import { PartialType } from '@nestjs/mapped-types';
import { NvimPluginDto } from './create-nvim-plugin.dto';

export class UpdateNvimPluginDto extends PartialType(NvimPluginDto) {}
