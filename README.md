<img height="100" width="500" src="signmeasong.svg" /> <br>

# Sing me a Song

# Tabela de Conteúdos

* [Sobre](#sobre)
* [Testes Automatizados](#testes)
* [Tecnologias](#tecnologias)
* [Rodando a aplicação](#run)

# Sobre
<h3> Já pediu para alguém alguma recomendação de música? Chegou a hora de transformar isso em código. Nessa semana, você vai construir a rede Sing me a Song. Ou melhor, os testes desta rede!

Sing me a song é uma aplicação para recomendação anônima de músicas. Quanto mais as pessoas curtirem uma recomendação, maior a chance dela ser recomendada para outras pessoas 🙂</h3>
  <br>


# Testes Automatizados
<details>
<summary><font size="4">Testes de integração: npm test </font></summary> 
        <h2>Aqui foi feito 27 testes que integravam todas as funcionalidades do back-end do projeto, desde o router, passando por controllers, services e repository.</h2>
        
</details>

<details>
<summary><font size="4">Testes unitários: npm run test:unit </font></summary> 
        <h2>Aqui foi realizado testes de todas as camada do Services com 100% de coverage.</h2>
        
</details>
<details>

<summary><font size="4">Testes de ponta a ponta </font></summary> 
        <h2>Aqui foi realizado testes de ponta a ponta utilizando o cypress para testar o comportamento do usuário ao:<br>
        - Criar nova recomendação;<br>
        - aumentar e diminuir score;<br>
        - Deletar recomendação quando o score estiver abaixo de -5
        </h2>
        
</details>



# Tecnologias

    - Jest
    - Cypress
    - Prisma
    - Express
    - React


 # Rodando a aplicação

<h3>De inicio certifique-se que voce tem a ultima versão estável do Node.js e npm rodando localmente. </h3>   <br>
<h3>Em seguida faça o clone desse repositório na sua maquina: </h3>

```bash
git clone https://github.com/CaioVitor1/Sign-me-a-song.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias. Execute esse comando dentro da pasta do Front-End e do Back-End.


```bash
npm install
```

Finalizado o processo, é só inicializar os servidores
<h2>Back-End</h2>

Rodando o back:

```bash
npm run dev
```

Testes de integração:

```bash
npm test
```

Testes unitários:

```bash
npm run test:unit
```

<h2>Front-End</h2>
<h3>o front-end precisa de um arquivo .env com o seguinte conteúdo: </h3>

```bash
REACT_APP_API_BASE_URL=http://localhost:5000
```

Rodando o Front:

```bash
npm start
```

Inicializando o cypress para testes de ponta a ponta:

```bash
npx cypress open
```



            
          

---

Made by <a href='https://www.linkedin.com/in/caiovitor33/'> Caio Vitor </a>


    