import { ApiProperty } from "@nestjs/swagger";

export class CreateNvimPluginDto {
    @ApiProperty({ example: 'xXjohndoeXx_swaggerITA', description: 'The username of the user' })
    username: string;
    
    @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
    id_token: string
    
    @ApiProperty({ example: 1000, description: 'The total number of keys pressed', default: 0 })
    total_key_pressed: number;
}
