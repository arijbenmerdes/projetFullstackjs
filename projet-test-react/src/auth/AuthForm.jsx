import { useState } from "react";
import authService from "../services/authService";


const AuthForm = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const [twoFactorToken, setTwoFactorToken] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [authToken, setAuthToken] = useState(null);


  const handleLogin = async () => {
    try {
      const response = await authService.login(email, password);
      setAuthToken(response.data.accessToken);
      const setupResponse = await authService.setup2FA(response.data.accessToken);
      setQrCodeImage(setupResponse.data.qrCodeImage);
      console.log('2FA Secret:', setupResponse.data.secret);   
           } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };



  const handleVerify2FA = async () => {
    try {
        
            const response = await authService.verify2FA(authToken, twoFactorToken);
            console.log('Réponse de l\'API:', response.data);
            alert(response.data.message);
         // Délai de 2 secondes (2000 millisecondes)
    } catch (error) {
        console.error('Erreur lors de la vérification 2FA:', error);
    }
};

    return (
        <div>
          <h2>Connexion</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Se connecter</button>
    
          {qrCodeImage && (
            <div>
              <h3>Configurer l'authentification à deux facteurs</h3>
              <img src={qrCodeImage} alt="QR Code" />
              <input
                type="text"
                placeholder="Token 2FA"
                value={twoFactorToken}
               onChange={(e) => setTwoFactorToken(e.target.value)}
              />
              <button onClick={handleVerify2FA}>Vérifier 2FA</button>
            </div>
          )}
        </div>
      );
};
export default AuthForm;