<p align="center">
  <strong>Desafio Admin-web</strong><br>
  <br>
</p>

Que tal ser desafiado pela Stone?

O seu desafio será construir uma aplicação de gestão financeira para o mundo dos negócios de uma nova empresa que está em constante crescimento. Voce terá o papel de ajudar a alavancar os negócios dessa empresa. Um nome bem legal para ela ficará a seu critério, mas ao longo do texto a chamaremos de **Rocha Incrível**.

A Rocha terá você como desenvolvedor responsável pelas novas funcionalidades que a mesma deverá soltar no mercado ainda este ano. A empresa tem usuários em sua base de dados e agora vai começar a oferecer cartão de crédito para eles. A Rocha conta com times que fazem a análise dos usuários para a liberação do cartão de crédito, mas o sistema que automatizará todo o processo ainda não existe. Os nossos futuros clientes, os análistas, usam uma planilha para controle interno. Essa planilha controla os cartoes "Solicitados", "Aprovados", "Rejeitados" e,  também é utilizada para auditoria das ações dos próprios analistas.

Precisamos que a nossa aplicação de gestão seja capaz de fornecer aos nossos analistas as informações necessárias sobre os usuários da base e as solicitações de cartão. A plataforma deverá fornecer ao operador (Analista) meios de **aprovar**, **rejeitar** ou **excluir** os pedidos de cartão e de acompanhar o histórico das ações que foram executadas.

Os operadores trabalham em 2 times diferentes, time n1 e n2. Para isso a API disponibiliza os roles de acesso para cada analista cadastrado, dessa forma será possível exibir somente informações relevantes para cada time e manter a segurança da informação.

Lembre-se que o time de back-end já criou uma API que fornecerá as informações necessárias para todo o desenvolvimento.

## Desafio
Alguns pontos foram enumerados para que consigamos fornecer ao nosso operador um sistema robusto de administração de Cartão de crédito. O desafio conta com uma API (servidor) que funcionará na porta 3001. Dessa forma, não será necessário desenvolver uma nova. Você deve focar na criação da aplicação front (Client) que utilizará as rotas disponíveis e rodará na porta 3000.

### Parte 1 - O Analista deve ser capaz de:
> Recursos do contexto **users**, **cards**, **audits**

1. **Visualizar** usuários da base.
  - GET http://localhost:3001/api/users
2. **Visualizar** cartoes disponíveis.
  - GET http://localhost:3001/api/cards
3. **Visualizar** Auditoria. Esta deve conter o histórico de ações do operador (Item 4).
  - GET http://localhost:3001/api/audits
4. **Aprovar** e **rejeitar** um pedido de cartão. Essas ações alteram o status do pedido e devem gerar logs em auditoria. O status inicial de um pedido é "requested", mas pode ser alterado para "approved" ou "rejected". Não deve ser possível alterar o status de um cartão mais de uma vez.
  - PUT http://localhost:3001/api/cards/:id
  - POST http://localhost:3001/api/audits
 
<br />

### Parte 2 - O Analista deve ser capaz de: **(Recursos adicionais)**
> Recursos do contexto **features**, **analysts**

1. **Entrar** na aplicação com email e senha. Utilizar a rota "/analysts" como auxílio e fazer a validação direto no client, ou seja a sessao do usuário deverá ser implementada no front e pode seguir um caminho simples sem problemas. A tela de login deverá conter os campos email e senha.
 - GET http://localhost:3001/api/analysts
2. **Excluir** e **Criar** um pedido de cartão. A ação de excluir, remove um elemento por inteiro, e a de criar gera um novo pedido de cartão com status "requested. Ambas as ações devem gerar logs em auditoria. Um cartão só pode ser criado para usuários que tenham "card" em enabledFeatures. A rota "/features" pode ser utilizada como auxilio para entender cada enabledFeatures do usuário.
 - POST http://localhost:3001/api/cards
 - DELETE http://localhost:3001/api/cards/:id
 - GET http://localhost:3001/api/features
3. **Atualizar** o "nome impresso" do usuário de um pedido de cartão.
 - PUT http://localhost:3001/api/cards/:id
4. Analista que tem somente a role **n1 não deve ser capaz de visualizar** auditoria.
5. Analista que tem somente a role **n1 não deve ser capaz de visualizar** salário base do usuário.
6. Analista que tem somente a role **n1 não deve ser capaz de visualizar** limite do cartão de crédito dos usuários.
7. Analista que tem somente a role **n1 não deve ser capaz de excluir** um pedido de cartão.
8. O operador deve ser capaz de visualizar em auditoria o nome do usuário que executou a ação. Utilizar o campo requestedBy, que representa o identificador do usuário que executou tal ação.
9. **Sair** da aplicação. Redirecionar o usuário para tela de login. Voce deverá remover a sessao do usuário no front e direcioná-lo para a tela de login.

<br />

Observações
- Tente exibir informações que acredite que sejam relevantes para o analista. No caso de usuário, é essencial exibir nome, documento e email, por exemplo.
- Toda operação gera um novo item na lista de auditoria, ou seja tudo deve ser rastreável. A sua aplicação deverá fornecer uma área para auditoria e usar a rota "/audits" existente no desafio.
- Analista com roles (n1 e n2) ou (n2) é resumida em n2. Podemos inferir que roles de n2 implicam em mais responsabilidades. Uma role pode ser entendido como um grupo de acesso.
- Este projeto conta com uma aplicação cliente servidor. O servidor disponibilizará as rotas necessárias para todo o desenvolvimento, tanto da parte 1 quanto da parte 2. A aplicação front presente conta com um App start do react que voce deverá substituir pelo sistema elaborado no desafio.

## Projeto

### Como rodar o APP Cliente-Servidor

```sh
1- yarn build
2- yarn dev

ou

npm run build
npm run start
```

output:

```
// CRA - Acessar pelo navegador
  http://localhost:3000/

// Api
  Resources:
  http://localhost:3001/api/users
  http://localhost:3001/api/analysts
  http://localhost:3001/api/cards
  http://localhost:3001/api/features
  http://localhost:3001/api/audits
```

### **Estrutura de dados**

- **Users**
> Usuários da base

```json
{
  "name": "Nome do usuário",
  "email": "Email do usuário",
  "BirthDate": "Data de Nascimento do usuário",
  "createdAt": "Data de criação do usuário",
  "updatedAt": "Data da última atualização do usuário",
  "enabledFeatures": "Lista de recursos habilitados",
  "document": "Documento do usuário",
  "metadatas": {
    "validDocument": "O documento é válido? A IA é quem define este campo.",
    "verified": "O usuário foi verificado pela IA da empresa?"
  },
  "address": "Endereço",
  "salaryBase": "Salário em centavos",
  "id": "Identificador único do usuário"
}
```

- **Analysts**
> Analistas ou operadores que utilizarão o web-app

```json
{
  "id": "Id do analista",
  "user_id": "Id do usuário",
  "email": "Email de autenticação do analista",
  "password": "Senha do analista",
  "roles": "Cada role representa um grupo de acesso"
}
```

- **Cards**
> Cartões solicitados para alguns usuários da base

```json
{
  "createdAt": "Data de criação do cartão",
  "updatedAt": "Data de atualização do cartão",
  "status": "Status do cartão",
  "id": "Id do cartão",
  "user_id": "Id do usuário",
  "metadatas": {
    "name": "Nome impresso no cartão usuário",
    "digits": "Dígitos do cartão",
    "limit": "Limite do cartão de crédito em reais"
  }
}
```

- **Features**
> Lista dos recursos que a empresa pode oferecer aos seus clientes

```json
{
  "result": [
    {
      "id": "id da feature",
      "name": "Nome da feature disponibilizada pela empresa"
    }
  ],
  "status": 200
}
```

- **Audits**
> Histórico das Ações realizadas pelos operadores

```json
{
  "id": "Id único deste evento",
  "createdAt": "Data que esta ação foi executada",
  "type": "Nome da ação executada pelo usuário, esse campo pode ser definido por voce, ex: cartao_removido, status_alterado",
  "before": "Valor antigo, antes da alteração",
  "after": "Valor novo, o que foi alterado, também pode conter todos os campos do cartão que foi alterado por exemplo",
  "requestedBy": "Id do analyst que executou a ação",
}
```

Observações

- Cada cartão tem seu próprio estado e sempre parte do estado "requested" (solicitado).
- Uma feature habilitada - que é retornada dentro de usuário - diz ao operador quais recursos aquele usuário tem disponível.

### **Desenvolvimento**
Faça um clone deste projeto para começar o seu desafio. O mesmo deve estar presente em seu repositório pessoal mas com **acesso privado**. O projeto do desafio conta com react-scripts e Typescript para lhe ajudar durante o desenvolvimento.

### **Layout**

Fique à vontade para definir seu próprio layout. Mas vamos deixar algumas dicas:

- O layout precisa "escalar", ou seja, qual a visão de futuro para o App caso precise adicionar mais informações?
- Não se prenda a algum layout específico que tenha encontrado pela internet, deixe sua criatividade tomar conta.
- O tratamento dos campos é por sua conta, por exemplo CPF: "58395591055" -> "583.955.910-55".

### **Entrega**

- O código possui algum controle de dependências?
- O resultado final está completo para ser executado?
- O resultado final atende ao que se propõe fazer?
- O resultado final atende totalmente aos requisitos propostos?
- O resultado final é visualmente elegante?
- O resultado final está acompanhado de testes automatizados?

### **Boas Práticas**

- O código está de acordo com o guia de estilo da linguagem?
- O código está bem estruturado?
- O código faz bom uso de _Design Patterns_?
- A separação dos componentes visam atender o modelo implementado?

### **Documentação**

- O código foi entregue com um arquivo de README claro de como se guiar?
- O código possui comentários pertinentes?
- O código está em algum controle de versão?
- Os commits são pequenos e consistentes?
- As mensagens de commit são claras?

### **Deploy**

- Publique seu código no seu perfil no GitHub de forma privada.
- Publique sua aplicação [heroku](https://www.heroku.com/)
  - Crie uma conta no Heroku.
  - Habilite o [Heroku Github Action](https://github.com/marketplace/actions/deploy-to-heroku).
  - Edite o template em "workflows/node.js.yml" para realizar o deploy de forma automática.

### **Outras informações**

- Utilize React + TypeScript.
- Ferramentas como BootStrap, MUI, MaterializeCSS podem ser utilizadas.
- A implementação de testes é obrigatória e tem o seu peso de acordo com o nível.

### **Material de Estudo**

- [Boas Práticas de commit](https://github.com/stone-payments/stoneco-best-practices/blob/master/gitStyleGuide/README_pt.md)
- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React-Admin](https://marmelab.com/react-admin/)
- [REST](https://pt.wikipedia.org/wiki/REST)
- [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)

## Entrega do desafio para avaliação
1. O repositório contendo o seu projeto deve estar **privado**.
2. O time de recrutamento fornecerá os usuários (revisores) que precisam de acesso ao seu projeto. Para adicionar estes usuários, será necessário ir no Github em "Settings" -> "Manage access" -> "Add people".
3. O time de desenvolvimento da Stone precisará do link para o seu repositório. Dessa forma conseguiremos revisar, testar e acompanhar o progresso do mesmo até a entrega final.
4. Manter contato com o time de recrutamento para levantar dúvidas e nos atualizar sobre progresso.
5. Aguardar.

Tenha um bom desafio.
