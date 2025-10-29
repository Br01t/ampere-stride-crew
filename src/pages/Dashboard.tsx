import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  participants: string;
}

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    type: 'Allenamento',
    description: '',
    participants: '',
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const eventsSnapshot = await getDocs(collection(db, 'events'));
      const eventsData = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Event));
      setEvents(eventsData);
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Impossibile caricare gli eventi',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingEvent) {
        await updateDoc(doc(db, 'events', editingEvent.id), formData);
        toast({
          title: 'Successo',
          description: 'Evento aggiornato con successo',
        });
      } else {
        await addDoc(collection(db, 'events'), formData);
        toast({
          title: 'Successo',
          description: 'Evento creato con successo',
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      loadEvents();
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Impossibile salvare l\'evento',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo evento?')) return;
    
    try {
      await deleteDoc(doc(db, 'events', id));
      toast({
        title: 'Successo',
        description: 'Evento eliminato con successo',
      });
      loadEvents();
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Impossibile eliminare l\'evento',
        variant: 'destructive',
      });
    }
  };

  const openEditDialog = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.type,
      description: event.description,
      participants: event.participants,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      type: 'Allenamento',
      description: '',
      participants: '',
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard Admin</h1>
            <p className="text-muted-foreground">Gestisci gli eventi del club</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Nuovo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingEvent ? 'Modifica Evento' : 'Nuovo Evento'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titolo</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Allenamento">Allenamento</SelectItem>
                        <SelectItem value="Long Run">Long Run</SelectItem>
                        <SelectItem value="Gara">Gara</SelectItem>
                        <SelectItem value="Avventura">Avventura</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Orario</Label>
                    <Input
                      id="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Luogo</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="participants">Partecipanti</Label>
                    <Input
                      id="participants"
                      value={formData.participants}
                      onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrizione</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Annulla
                  </Button>
                  <Button type="submit">
                    {editingEvent ? 'Aggiorna' : 'Crea'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{event.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.type} • {event.date} • {event.time}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditDialog(event)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{event.description}</p>
                <p className="text-sm">
                  <strong>Luogo:</strong> {event.location}
                </p>
                <p className="text-sm">
                  <strong>Partecipanti:</strong> {event.participants}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
