import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Footprints } from 'lucide-react'; // piccola icona per dare atmosfera 🏃‍♂️

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
          description: "Benvenuto/a tra i runner di Ampere!",
        });
      } else {
        await signUp(email, password);
        toast({
          title: "Registrazione completata!",
          description: "Account creato con successo — sei pronto per correre con noi!",
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-orange-100 dark:from-slate-900 dark:to-slate-950 p-4">
      {/* Header con logo/testo */}
      <div className="mb-6 flex items-center space-x-2">
        <Footprints className="w-8 h-8 text-orange-600" />
        <h1 className="text-2xl font-bold text-orange-700 dark:text-orange-400">
          Ampere Running Club
        </h1>
      </div>

      <Card className="w-full max-w-md shadow-lg border-orange-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle>{isLogin ? 'Accedi al tuo profilo' : 'Unisciti al club'}</CardTitle>
          <CardDescription>
            {isLogin 
              ? 'Accedi per tenere traccia dei tuoi allenamenti e partecipare agli eventi del club.'
              : 'Registrati e inizia a correre con la community Ampere!'}
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
            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={loading}>
              {loading ? 'Caricamento...' : isLogin ? 'Accedi' : 'Registrati'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-orange-700 transition-colors"
            >
              {isLogin 
                ? 'Non hai un account? Unisciti al club' 
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
              Torna alla home del club
            </Button>
          </div>

          {/* Piccola sezione motivazionale */}
          <p className="mt-6 text-sm text-center text-muted-foreground">
            “Ogni passo conta — entra a far parte della community di runner che non si ferma mai.” 🏃‍♀️
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;