import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service'; // Assure-toi de bien importer ton service utilisateur

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

constructor(private userService: UserService
) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'fallbackSecret',
    });
  }

  // La méthode validate() est appelée par Passport pour valider le token
  async validate(payload: JwtPayload) {
    const user = await this.userService.findOneByEmail(payload.email);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    return user; // Retourne l'utilisateur si le token est valide
  }
}
