import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class UpdateUserDto {

    @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
    @Prop({ required: true })
    username: string;

    @ApiProperty({ example: 'John', description: 'The first name of the user' })
    @Prop({ required: true })
    first_name: string;

    @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
    @Prop({ required: true })
    last_name: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @Prop({ required: true })
    password: string;
    


}