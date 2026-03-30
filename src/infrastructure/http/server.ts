import express from 'express';
import cors from 'cors';

// Configurações Globais
import { configSwagger } from './swagger';
import { errorHandler } from './middlewares/error.middleware';

// Roteamento REST
import { authRouter } from './routes/auth.routes';
import { consultasRouter } from './routes/consultas.routes';
import { prontuariosRouter } from './routes/prontuarios.routes';

import { pacienteRepo, secretariaRepo, dentistaRepo, usuarioRepo, horariosRepo, prontuarioRepo, consultaRepo } from './di';
import { Paciente } from '../../domain/entities/Paciente';
import { Secretaria } from '../../domain/entities/Secretaria';
import { Dentista } from '../../domain/entities/Dentista';
import { Horarios } from '../../domain/entities/Horarios';
import { Prontuario } from '../../domain/entities/Prontuario';

const app = express();

// Middlewares Globais
app.use(cors());
app.use(express.json());

// Injeção de Dados em Memória (Mocks)
const pacienteSeed = new Paciente("João", "11122233344", "joao.paciente", "senha123", "Rua X", new Date(), "119999");
const secretariaSeed = new Secretaria("Maria", "00000000000", "maria.sec", "admin123", "MAT-1");

usuarioRepo.salvar(pacienteSeed);
pacienteRepo.salvar(pacienteSeed);
usuarioRepo.salvar(secretariaSeed);
secretariaRepo.salvar(secretariaSeed);

// Mock de Agendamento
const dentistaSeed = new Dentista("Dr. Hans Chucrute", "99988877766", "hans.dent", "dent123", "CRO-123");
const horarioAmanha = new Horarios("horario-exemplo", "99988877766", new Date(), "14:00", "15:00", "LIVRE");

usuarioRepo.salvar(dentistaSeed);
dentistaRepo.salvar(dentistaSeed);
horariosRepo.salvar(horarioAmanha);

// Mock de Prontuário
const prontuarioSeed = new Prontuario('prontuario-joao-123', pacienteSeed.cpf, 'Paciente com alergia a dipirona.', [], []);
prontuarioRepo.salvar(prontuarioSeed);

// Histórico Clínico Mock (Regra de Vínculo RN11)
import { ConsultaAvaliacao } from '../../domain/entities/Consulta';
const consultaPassada = new ConsultaAvaliacao('consulta-hist-01', pacienteSeed.cpf, dentistaSeed.cpf, 'horario-antigo', 150.00, 'AGENDADA');
consultaRepo.salvar(consultaPassada);

// Setup de API Docs
configSwagger(app);

// Mount de Endpoints
app.use('/api/auth', authRouter);
app.use('/api/consultas', consultasRouter);
app.use('/api/prontuarios', prontuariosRouter);

// Healthcheck Global
app.get('/api/health', (req, res) => {
    res.json({ status: 'API Operacional' });
});

// Handler Terminal de Erros
app.use(errorHandler);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`[API] Server initialized on port ${PORT}`);
});
