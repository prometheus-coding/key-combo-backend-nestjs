import { Prop } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"

export class AuthDto{
    @ApiProperty({ example: 'john@example.com', description: 'The user email' })
    @Prop({ required: false })
    email: string
    
    @ApiProperty({ example: 'Password123!', description: 'The user password' })
    @Prop({ required: false })
    password: string
}