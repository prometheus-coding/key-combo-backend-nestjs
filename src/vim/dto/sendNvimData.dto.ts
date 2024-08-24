import { ApiProperty } from "@nestjs/swagger";

export class sendNvimDataDto {
    @ApiProperty({ example: 'jbf764e4d1e299b00d6f4be2a8a2c1461a7d4ca02c9121bf82dcb897322358e3b', description: 'The id token string' })
    id_token: string
    
    @ApiProperty({ example: 1000, description: 'The total number of keys pressed in new combo', default: 0 })
    total_key_pressed: number;
}
