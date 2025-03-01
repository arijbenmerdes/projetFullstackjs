import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

 // Créer un nouvel utilisateur
 async create(username: string, password: string,email:string): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(password, 10); // Hachage du mot de passe

    const newUser = new this.userModel({ username, password: hashedPassword,email });
    return newUser.save();
  }
// // Vérifier le mot de passe
//   async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
//     return bcrypt.compare(password, hashedPassword); // Comparaison des mots de passe
//   }
  
  // Trouver un utilisateur par son nom d'utilisateur
  async findOneByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }


  // Trouver un utilisateur par son email
  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }
  async findById(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId).exec();
  }
  async update(userId: string, updateData: Partial<UserDocument>): Promise<UserDocument | null> {
    return this.userModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
  }
  
}
