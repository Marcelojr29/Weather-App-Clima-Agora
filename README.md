# ☀️ Clima Agora - Weather Dashboard

Uma aplicação moderna de previsão do tempo desenvolvida com **Angular 17+**, utilizando as mais recentes funcionalidades do framework incluindo **Signals**, **Standalone Components**, **RxJS** e **animações dinâmicas**.

![Angular](https://img.shields.io/badge/Angular-17.3-DD0031?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript)
![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?logo=reactivex)
![Lucide](https://img.shields.io/badge/Lucide-Icons-F56565?logo=lucide)
![Open--Meteo](https://img.shields.io/badge/Open--Meteo-API-00C7B7?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+)

## 🚀 Funcionalidades

- 🔍 **Busca de Cidades** com autocomplete inteligente via API de Geocoding
- 🌡️ **Dashboard do Clima** com temperatura, sensação térmica, umidade e vento
- 📅 **Previsão para 7 dias** com temperaturas máximas/mínimas
- 🎨 **Ícones Dinâmicos** com cores e animações baseadas nas condições climáticas
  - ☀️ Sol dourado pulsante
  - ⛈️ Tempestade com efeito de relâmpago
  - 🌧️ Chuva com tremor
  - ❄️ Neve flutuando
  - 🌫️ Nevoeiro com fade
- 📝 **Histórico de Buscas** - últimas 5 cidades armazenadas no LocalStorage
- 🔄 **Toggle de Unidade** - alternância entre Celsius (°C) e Fahrenheit (°F)
- 📱 **Design Responsivo** - funciona perfeitamente em desktop, tablet e mobile
- 🎭 **Interface Moderna** com glassmorphism e gradientes animados
- 🆓 **100% Gratuita** - sem necessidade de API key!

## 🎯 Conceitos de Angular Demonstrados

### 1. Fundamentos Core
- ✅ **Standalone Components** (sem módulos)
- ✅ **Signals** (estado reativo)
- ✅ **Computed Signals** (valores derivados)
- ✅ **Templates modernos** (sintaxe @if, @for)
- ✅ **Property Binding** e **Event Binding**
- ✅ **Interpolação**
- ✅ **Diretivas** (ngIf, ngFor via control flow)
- ✅ **Pipes customizados**
- ✅ **Serviços** com Dependency Injection

### 2. Arquitetura Avançada
- ✅ **Componentização adequada** (smart/dumb components)
- ✅ **Lazy Loading** (preparado para rotas)
- ✅ **Estrutura de pastas organizada** (features/core/shared)
- ✅ **Separação de concerns** (models, services, store)

### 3. Gerenciamento de Estado
- ✅ **RxJS** (Observables, Subjects, Operators)
- ✅ **Signals** para estado local reativo
- ✅ **Store Pattern** (WeatherStore)
- ✅ **toSignal()** para integração RxJS + Signals

### 4. Consumo de API
- ✅ **HttpClient** moderno
- ✅ **Observables** com operadores RxJS
- ✅ **Tratamento de erros** (catchError, retry)
- ✅ **Encadeamento de chamadas** (geocoding + weather)

### 5. Performance
- ✅ **OnPush Change Detection** (via Signals)
- ✅ **trackBy** em listas
- ✅ **Lazy Loading** de rotas
- ✅ **Debouncing** no autocomplete

## 📋 Pré-requisitos

- **Node.js** 18.x ou superior
- **npm** 9.x ou superior
- **Angular CLI** 17.x

```bash
npm install -g @angular/cli@17
```

## ⚙️ Instalação e Uso

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd clima-agora
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute a aplicação
```bash
npm start
```

**Pronto!** Não é necessário configurar nenhuma API key 🎉

A aplicação usa a [Open-Meteo API](https://open-meteo.com), que é:
- ✅ **100% gratuita**
- ✅ **Sem necessidade de cadastro**
- ✅ **Sem limite de requisições para uso pessoal**
- ✅ **Dados de alta qualidade** de serviços meteorológicos oficiais

## 🎮 Executando a Aplicação

### Servidor de desenvolvimento
```bash
npm start
# ou
ng serve
```

Acesse `http://localhost:4200/`

### Build de produção
```bash
npm run build
# ou
ng build
```

Os arquivos estarão em `dist/`

### Testes
```bash
npm test
# ou
ng test
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── core/                    # Funcionalidades core
│   │   ├── models/              # Interfaces TypeScript
│   │   │   ├── weather.model.ts
│   │   │   └── forecast.model.ts
│   │   ├── services/            # Serviços singleton
│   │   │   ├── weather.service.ts
│   │   │   └── storage.service.ts
│   │   └── store/               # Gerenciamento de estado
│   │       └── weather.store.ts
│   │
│   ├── features/                # Features/Páginas
│   │   ├── home/
│   │   │   ├── components/      # Componentes da home
│   │   │   │   ├── search-bar/
│   │   │   │   ├── current-weather/
│   │   │   │   └── forecast-card/
│   │   │   ├── home.component.ts
│   │   │   ├── home.component.html
│   │   │   └── home.component.scss
│   │   └── history/
│   │       └── history.component.ts
│   │
│   ├── shared/                  # Componentes/Pipes compartilhados
│   │   ├── components/
│   │   │   └── unit-toggle/
│   │   └── pipes/
│   │       ├── temperature.pipe.ts
│   │       └── weather-icon.pipe.ts
│   │
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
│
├── environments/                # Configurações de ambiente
│   ├── environment.ts
│   └── environment.development.ts
│
└── styles.scss                  # Estilos globais
```

## 🎨 Design & UI/UX

- **Gradiente de fundo animado** (15s de loop suave)
- **Glassmorphism** nos cards e componentes com backdrop-filter
- **Ícones Lucide** - SVG otimizados com tree-shaking
- **Animações dinâmicas por clima**:
  - Sol: Pulsação dourada com glow
  - Tempestade: Flash estilo relâmpago
  - Chuva: Movimento de tremor
  - Neve: Flutuação com rotação
  - Nevoeiro: Fade de opacidade
- **Cores temáticas** por condição climática
- **Design responsivo** mobile-first
- **Acessibilidade** com contraste adequado e aria-labels

## 🛠️ Tecnologias

- **Angular 17.3** - Framework moderno com Signals
- **TypeScript 5.4** - Tipagem estática
- **RxJS 7.8** - Programação reativa
- **SCSS** - Estilização avançada com variáveis e mixins
- **Lucide Angular** - Biblioteca de ícones SVG moderna e otimizada
- **Open-Meteo API** - Dados meteorológicos gratuitos e confiáveis

## 📚 APIs Utilizadas

### Open-Meteo API
A aplicação utiliza a [Open-Meteo API](https://open-meteo.com), uma API meteorológica de código aberto que oferece:

- **Clima Atual**: Temperatura, sensação térmica, umidade, velocidade do vento
- **Previsão para 7 dias**: Temperaturas máximas/mínimas, condições climáticas
- **Geocoding**: Busca de cidades e coordenadas geográficas
- **Códigos WMO**: Padronização internacional de condições climáticas

**Vantagens da Open-Meteo:**
- 🆓 Totalmente gratuita
- 🚀 Sem necessidade de API key
- 📊 Dados de múltiplos modelos meteorológicos
- 🌍 Cobertura global
- ⚡ Alta performance e disponibilidade

##  Notas de Aprendizado

Este projeto foi desenvolvido para estudo e demonstração de:

1. **Signals**: Nova forma reativa de gerenciar estado no Angular
2. **Standalone Components**: Arquitetura sem NgModules
3. **RxJS + Signals**: Integração entre paradigmas (toSignal, switchMap)
4. **Operadores RxJS**: switchMap, catchError, retry, debounceTime
5. **Pipes Customizados**: Transformação de dados no template (conversão °C/°F)
6. **LocalStorage**: Persistência de dados no navegador
7. **Performance**: trackBy, debounce, OnPush via Signals
8. **Componentização**: Separação de responsabilidades (smart/dumb)
9. **TypeScript**: Tipagem forte e interfaces
10. **SCSS**: Estilização modular com glassmorphism e animações

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se livre para:

- Abrir issues para reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests com melhorias

## 📄 Licença

Este projeto é de código aberto e está disponível para fins educacionais.

## 👨‍💻 Autor

Desenvolvido com ❤️ para aprendizado de Angular

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
