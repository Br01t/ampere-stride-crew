import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '@/lib/firebase';
import { storage } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload } from 'lucide-react';

interface ProfileData {
  firstName: string;
  lastName: string;
  bio: string;
  photoURL: string;
}

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    bio: '',
    photoURL: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const profileDoc = doc(db, 'profiles', user.uid);
        const snapshot = await getDoc(profileDoc);

        if (snapshot.exists()) {
          setProfile(snapshot.data() as ProfileData);
        }
      } catch (error) {
        console.error('Errore caricamento profilo:', error);
        toast({
          title: 'Errore',
          description: 'Impossibile caricare il profilo',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, toast]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !user) return;

    const file = e.target.files[0];
    
    // Verifica dimensione (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Errore',
        description: 'L\'immagine deve essere inferiore a 5MB',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      const storageRef = ref(storage, `profile-photos/${user.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      setProfile({ ...profile, photoURL });

      toast({
        title: 'Successo',
        description: 'Foto profilo caricata',
      });
    } catch (error) {
      console.error('Errore upload foto:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile caricare la foto',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);

    try {
      const profileDoc = doc(db, 'profiles', user.uid);
      await setDoc(profileDoc, profile);

      toast({
        title: 'Successo',
        description: 'Profilo aggiornato',
      });
    } catch (error) {
      console.error('Errore salvataggio profilo:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile salvare il profilo',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const initials = `${profile.firstName?.charAt(0) || ''}${profile.lastName?.charAt(0) || ''}`.toUpperCase();

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Il tuo Profilo</CardTitle>
            <CardDescription>Gestisci le tue informazioni personali</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Foto Profilo */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profile.photoURL} />
                <AvatarFallback className="text-2xl">{initials || user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                  id="photo-upload"
                />
                <Label htmlFor="photo-upload">
                  <Button variant="outline" disabled={uploading} asChild>
                    <span className="cursor-pointer">
                      {uploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Caricamento...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Carica Foto
                        </>
                      )}
                    </span>
                  </Button>
                </Label>
              </div>
            </div>

            {/* Email (non modificabile) */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email || ''} disabled />
            </div>

            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="firstName">Nome</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                placeholder="Inserisci il tuo nome"
              />
            </div>

            {/* Cognome */}
            <div className="space-y-2">
              <Label htmlFor="lastName">Cognome</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                placeholder="Inserisci il tuo cognome"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Racconta qualcosa di te..."
                rows={4}
              />
            </div>

            {/* Pulsante Salva */}
            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvataggio...
                </>
              ) : (
                'Salva Modifiche'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
