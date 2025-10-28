import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const monthlyKmData = [
  { name: "Gennaio", km: 120 },
  { name: "Febbraio", km: 140 },
  { name: "Marzo", km: 100 },
  { name: "Aprile", km: 160 },
  { name: "Maggio", km: 130 },
  { name: "Giugno", km: 150 },
  { name: "Luglio", km: 170 },
  { name: "Agosto", km: 140 },
];

const trainingTypeData = [
  { type: "Allenamento", km: 80, month: "Gennaio" },
  { type: "Long Run", km: 50, month: "Gennaio" },
  { type: "Gara", km: 70, month: "Gennaio" },
  { type: "Avventura", km: 60, month: "Gennaio" },
  { type: "Allenamento", km: 90, month: "Febbraio" },
  { type: "Long Run", km: 55, month: "Febbraio" },
  { type: "Gara", km: 75, month: "Febbraio" },
  { type: "Avventura", km: 65, month: "Febbraio" },
];

const participantsData = [
  { name: "Gennaio", partecipanti: 8 },
  { name: "Febbraio", partecipanti: 10 },
  { name: "Marzo", partecipanti: 6 },
  { name: "Aprile", partecipanti: 12 },
  { name: "Maggio", partecipanti: 9 },
  { name: "Giugno", partecipanti: 11 },
  { name: "Luglio", partecipanti: 13 },
  { name: "Agosto", partecipanti: 7 },
];

const allMonths = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto"];

const StatisticsPage = () => {
  const [selectedKmMonth, setSelectedKmMonth] = useState("Tutti");
  const [selectedTrainingMonth, setSelectedTrainingMonth] = useState("Tutti");
  const [selectedParticipantsMonth, setSelectedParticipantsMonth] = useState("Tutti");

  const filteredMonthlyKm = selectedKmMonth === "Tutti"
    ? monthlyKmData
    : monthlyKmData.filter((d) => d.name === selectedKmMonth);

  const filteredTrainingData = selectedTrainingMonth === "Tutti"
    ? trainingTypeData
    : trainingTypeData.filter((d) => d.month === selectedTrainingMonth);

  const filteredParticipants = selectedParticipantsMonth === "Tutti"
    ? participantsData
    : participantsData.filter((d) => d.name === selectedParticipantsMonth);

  return (
    <section className="py-24 bg-muted/30 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Statistiche</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualizza le performance del club mese per mese.
          </p>
        </div>

        {/* Grafico 1: Km percorsi */}
        <Card className="max-w-4xl mx-auto mb-10">
          <CardHeader className="flex flex-col items-start gap-2">
            <CardTitle>Chilometri percorsi al mese</CardTitle>
            <p className="text-sm text-muted-foreground">
              Mostra i chilometri percorsi dai membri del club ogni mese.
            </p>
          </CardHeader>
          <div className="flex flex-col items-start mb-4 px-4">
            <Select value={selectedKmMonth} onValueChange={setSelectedKmMonth}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tutti" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tutti">Tutti</SelectItem>
                {allMonths.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <CardContent className="px-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredMonthlyKm} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="km" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grafico 2: Tipologia allenamento */}
        <Card className="max-w-4xl mx-auto mb-10">
          <CardHeader className="flex flex-col items-start gap-2">
            <CardTitle>Andamento per tipologia di allenamento</CardTitle>
            <p className="text-sm text-muted-foreground">
              Visualizza i chilometri percorsi per ogni tipologia di allenamento.
            </p>
          </CardHeader>
          <div className="flex flex-col items-start mb-4 px-4">
            <Select value={selectedTrainingMonth} onValueChange={setSelectedTrainingMonth}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tutti" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tutti">Tutti</SelectItem>
                {allMonths.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <CardContent className="px-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredTrainingData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="km" stroke="hsl(var(--accent))" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grafico 3: Partecipanti */}
        <Card className="max-w-4xl mx-auto mb-10">
          <CardHeader className="flex flex-col items-start gap-2">
            <CardTitle>Partecipanti agli eventi</CardTitle>
            <p className="text-sm text-muted-foreground">
              Numero di partecipanti agli eventi mese per mese.
            </p>
          </CardHeader>
          <div className="flex flex-col items-start mb-4 px-4">
            <Select value={selectedParticipantsMonth} onValueChange={setSelectedParticipantsMonth}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tutti" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tutti">Tutti</SelectItem>
                {allMonths.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <CardContent className="px-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={filteredParticipants} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="partecipanti"
                  fill="hsl(var(--secondary)/30)"
                  stroke="hsl(var(--secondary))"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StatisticsPage;