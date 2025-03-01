import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Ajoutez votre logique d'authentification personnalisée si nécessaire
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Gérer les erreurs d'authentification ici
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
