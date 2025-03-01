import { Controller, Post, Body, HttpException, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TwoFactorService } from './2FA/two-factor.service';
import { User, UserDocument } from 'src/user/user.schema';
import * as speakeasy from 'speakeasy';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Controller('auth')
export class AuthController {
  constructor(@InjectModel(User.name) private UserModel:Model<User>,
    private authService: AuthService,
    private userService: UserService,
    private readonly twoFactorService: TwoFactorService
  ) {}

  @Post('signup')
  async signUp(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string
  ) {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new HttpException('Email déjà utilisé', HttpStatus.BAD_REQUEST);
    }

    return this.authService.signUp(username, password, email);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    return this.authService.signIn(email, password);
  }

  @Post('2fa-setup')
  @UseGuards(AuthGuard('jwt'))
  async setupTwoFactorAuth(@Req() req) {
    const user = req.user as UserDocument;
    const { qrCodeImage, secret } = await this.twoFactorService.generateTwoFactorSecret(user);
    return { qrCodeImage, secret };
  }

  @Post('2fa-verify')
  @UseGuards(AuthGuard('jwt'))
  async verifyTwoFactorAuth(@Req() req) {
    // Vérifier si req.user est défini
  //  const user = req.user as UserDocument;


  if (!req.user) {
    return { message: 'Erreur : utilisateur non authentifié.' };
  }
    const user = await this.userService.findById(req.user._id);
    if (!user?.twoFactorSecret) {
      return { message: 'Erreur : secret 2FA manquant.' };
    }
    console.log('Secret 2FA:', user.twoFactorSecret); // Ajoutez ceci pour vérifier le secret
    console.log('Token reçu:', req.body.token);
    const isValid = speakeasy.totp.verify({
      secret: user?.twoFactorSecret,
      token: req.body.token,
    });
    if (isValid) {
      // Marquer l'utilisateur comme authentifié avec succès
      return { message: 'Authentification réussie' };
    } else {
      // Gérer l'erreur de vérification
      return { message: 'Échec de la vérification du code TOTP' };
    }
  }

}
