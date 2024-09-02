import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { ScoreInfo } from "../users.schema";

export class UserScoreDto {

    @ApiProperty({ example: "Dimanet.com", description: 'The username of the user' })
    username: string
    @ApiProperty({  type: [ScoreInfo], description: 'the best score of the user' })
    bestScore: ScoreInfo

}