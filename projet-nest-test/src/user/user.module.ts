import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Enregistre le schéma avec Mongoose
      ],
      providers: [UserService],
      controllers: [UserController],
      exports: [UserService, MongooseModule], // Export UserService and MongooseModule

})
export class UserModule {
    
}
