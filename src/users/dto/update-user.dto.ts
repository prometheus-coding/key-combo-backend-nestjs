import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({ example: "540744b5db13f84b94d66ba0db84d09b79ff873bc67f69f97fb3c2880551133c", description: 'The unique user id_token' })
    id_token: number

    @ApiProperty({ example: 12034, description: 'The new set score' })
    score: number;

    @ApiProperty({ example: 10, description: 'The duration of the combo expressed in seconds' })
    combo_duration_in_seconds: number;

    @ApiProperty({ example: 120, description: 'The total number of key pressed during the combo' })
    total_key_pressed: number;

    @ApiProperty({ example: '2023-08-01T12:00:00Z', description: 'Combo updated at'})
    score_updated_at: Date;

  }