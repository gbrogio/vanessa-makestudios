# Mail Sender

## Descrição

Mail Sender é uma aplicação backend desenvolvida em **TypeScript** usando **Express.js**. A aplicação oferece funcionalidades para envio de e-mails através de endpoints específicos. Ela funciona como template para envio de e-mails em outros futuros projetos.

## Estrutura do Projeto

```
├── .env
├── .gitignore
├── api/
│   ├── index.ts
│   └── routes/
│       ├── index.ts
│       └── send-mail.ts
├── bun.lockb
├── docker-compose.yml
├── Dockerfile
├── example.http
├── nginx.conf
├── package.json
├── tsconfig.json
└── vercel.json
```

### Descrição dos Arquivos e Pastas

- **example.http**
  
  Contém exemplos de requisições HTTP para testar a API.
  No Visual Studio Code, instale a extensão "REST Client".

  ```http
  ### POST Request: TEXT
  POST http://localhost:3000/send-mail
  content-type: application/json

  {
    "to": "guilhermebrogio.ps@gmail.com",
    "from": "guilhermebrogio.ps@gmail.com",
    "subject": "Teste",
    "text": "Teste"
  }

  ### POST Request: HTML
  POST http://localhost:3000/send-mail
  content-type: application/json

  {
    "to": "guilhermebrogio.ps@gmail.com",
    "from": "guilhermebrogio.ps@gmail.com",
    "subject": "Teste",
    "html": "<h1>Teste</h1>"
  }
  ```

## Uso

### Produção

Para construir e iniciar o servidor em modo de produção:

```sh
npm run build
npm start
```

## Endpoints da API

### Enviar E-mail

- **URL:** `/send-mail`
- **Método:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body:**

  - **Texto:**

    ```json
    {
      "to": "destinatario@example.com",
      "from": "remetente@example.com",
      "subject": "Assunto",
      "text": "Corpo do e-mail em texto"
    }
    ```

  - **HTML:**

    ```json
    {
      "to": "destinatario@example.com",
      "from": "remetente@example.com",
      "subject": "Assunto",
      "html": "<h1>Corpo do e-mail em HTML</h1>"
    }
    ```

## Tecnologias Utilizadas

- **Node.js & Express.js:** Framework para construção da API.
- **TypeScript:** Superset de JavaScript para tipagem estática.
- **Nodemailer:** Envio de e-mails.
- **Zod:** Validação de schemas.
- **Docker & Docker Compose:** Containerização e orquestração de containers.
- **Nginx:** Proxy reverso e balanceamento de carga.
- **Redis:** Armazenamento de cache ou sessões.
- **Vercel:** Plataforma de implantação.

## Links Úteis

- [Documentação do Express](https://expressjs.com/)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do Nodemailer](https://nodemailer.com/about/)
- [Documentação do Zod](https://zod.dev/)
