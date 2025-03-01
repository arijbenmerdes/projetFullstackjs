import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt-auth-guard/jwt.strategy';
import { JwtAuthGuard } from './jwt-auth-guard/jwt-auth-guard.service';
import { TwoFactorService } from './2FA/two-factor.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallbackSecret', // Assurez-vous d'utiliser la même clé secrète ici
        signOptions: { expiresIn: '60m' }, // Durée de validité du token (1 heure)
    }),
    PassportModule,
    UserModule,
],
  providers: [AuthService, JwtStrategy, JwtAuthGuard,TwoFactorService],

  controllers: [AuthController],
  exports: [TwoFactorService],
})
export class AuthModule {}
