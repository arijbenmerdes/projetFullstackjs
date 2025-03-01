import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard/jwt-auth-guard.service';

@Controller('profile')
export class ProfileController {
@UseGuards(JwtAuthGuard)
  @Get()
  getDashboardData() {
    return { message: 'Données sécurisées du dashboard' };
  }

}
