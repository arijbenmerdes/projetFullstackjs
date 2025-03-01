import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from './auth/jwt-auth-guard/jwt-auth-guard.service';
import { ProfileService } from './profile/profile.service';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { TwoFactorService } from './auth/2FA/two-factor.service';

@Module({
  imports: [AuthModule, UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-test'),
    ProfileModule, // Connexion à MongoDB

  ],
  controllers: [AppController, ProfileController],
  providers: [AppService, JwtAuthGuard, ProfileService, TwoFactorService],
})
export class AppModule {}
