import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        toast({
          title: "Login effettuato!",
          description: "Benvenuto/a!",
        });
      } else {
        await signUp(email, password);
        toast({
          title: "Registrazione completata!",
          description: "Account creato con successo.",
        });
      }
      navigate('/');
    } catch (error: any) {
      const errorMessage = error.code === 'auth/email-already-in-use' 
        ? 'Email già registrata' 
        : error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'
        ? 'Credenziali non valide'
        : error.code === 'auth/weak-password'
        ? 'Password troppo debole (minimo 6 caratteri)'
        : 'Errore durante l\'autenticazione';
      
      toast({
        title: "Errore",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? 'Accedi' : 'Registrati'}</CardTitle>
          <CardDescription>
            {isLogin 
              ? 'Accedi al tuo account' 
              : 'Crea un nuovo account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="tua@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Caricamento...' : isLogin ? 'Accedi' : 'Registrati'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin 
                ? 'Non hai un account? Registrati' 
                : 'Hai già un account? Accedi'}
            </button>
          </div>
          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate('/')}
            >
              Torna alla home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
