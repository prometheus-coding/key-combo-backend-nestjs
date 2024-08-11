import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {

    @ApiProperty({ example: 12034, description: 'The new set score' })
    score?: number;

    @ApiProperty({ example: 10, description: 'The duration of the combo expressed in seconds' })
    combo_duration_in_seconds?: number;

    @ApiProperty({ example: 120, description: 'The total number of key pressed during the combo' })
    total_key_pressed?: number;
  }