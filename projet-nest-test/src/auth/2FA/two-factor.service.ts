import { Injectable } from '@nestjs/common';
import { UserDocument } from 'src/user/user.schema';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode'
import { UserService } from 'src/user/user.service';

@Injectable()
export class TwoFactorService {
    constructor(private readonly userService: UserService) {}
    
    async generateTwoFactorSecret(user: UserDocument) {
        const secret = speakeasy.generateSecret({ length: 20 });
        const otpauthUrl = speakeasy.otpauthURL({
          secret: secret.base32,
          label: user.email,
          issuer: 'TuniBalance',
        });
        user.twoFactorSecret = secret.base32;

        // Sauvegarder l'utilisateur avec le secret 2FA
        await this.userService.update(user._id  as string, { twoFactorSecret: secret.base32 });
        
        // Générer le QR code
        const qrCodeImage = await qrcode.toDataURL(otpauthUrl);
        return { qrCodeImage, secret: secret.base32 };
      }
}
