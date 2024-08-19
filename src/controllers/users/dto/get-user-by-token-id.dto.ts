import { ApiProperty } from "@nestjs/swagger";

export class GetUserByTokenIdDto {
    @ApiProperty({ example: '540744b5db13f84b94d66ba0db84d09b79ff873bc67f69f97fb3c2880551133c', description: 'Unique id_token string' })
    id_token: string
}