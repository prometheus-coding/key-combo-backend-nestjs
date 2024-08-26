import { Prop } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"

export class AuthDto{
    @ApiProperty({ example: 'johndoe@gmail.com', description: 'The user email' })
    @Prop({ required: false })
    email: string
    
    @ApiProperty({ example: 'asdJ2123!kifksd #+=', description: 'The user password' })
    @Prop({ required: false })
    password: string
}