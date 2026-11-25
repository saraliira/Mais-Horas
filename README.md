+ Horas — Controle de Extensão e Extracurricular

O + Horas é uma aplicação web desenvolvida para auxiliar estudantes no gerenciamento e acompanhamento das horas de atividades de extensão e extracurriculares exigidas pela instituição de ensino durante a graduação.

A plataforma permite configurar a grade curricular do curso, registrar atividades, anexar certificados e acompanhar o progresso individual e geral das horas cumpridas em cada período ou bloco.

🎯 Objetivo do Projeto

Facilitar o controle das atividades acadêmicas complementares, proporcionando aos estudantes uma maneira simples, organizada e acessível de acompanhar suas horas, evitando a perda de informações e permitindo uma visualização clara das metas a serem alcançadas.

✨ Funcionalidades
1. Configuração do Curso
Cadastro do nome do curso.
Definição da quantidade de períodos ou blocos.
Configuração da meta de horas de extensão por bloco.
Configuração da meta de horas extracurriculares por bloco.
2. Painel de Controle (Dashboard)
Visualização do progresso geral do curso.
Acompanhamento separado das horas de extensão e extracurriculares.
Exibição de percentuais de conclusão.
Barra de progresso geral.
Resumo detalhado das horas cumpridas em cada período ou bloco.
Cálculo automático das horas restantes.
3. Gerenciamento de Atividades
Cadastro de atividades de extensão e extracurriculares.
Associação de atividades aos períodos ou blocos correspondentes.
Registro do nome da atividade e quantidade de horas.
Edição de atividades cadastradas.
Exclusão de atividades com confirmação.
4. Gerenciamento de Certificados
Upload de comprovantes em formato PDF ou imagem.
Armazenamento dos certificados associados às atividades.
Download dos comprovantes cadastrados.
Preservação do comprovante existente durante a edição, caso nenhum novo arquivo seja enviado.
5. Acessibilidade
Navegação por teclado.
Link para pular diretamente ao conteúdo principal.
Identificação de elementos por leitores de tela.
Avisos dinâmicos utilizando atributos ARIA.
Indicadores visuais de foco.
6. Persistência de Dados
Armazenamento das informações utilizando localStorage.
Preservação das configurações do curso e atividades cadastradas após atualizar ou fechar o navegador.
Não necessita de banco de dados ou servidor para funcionar na versão atual.
🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido utilizando tecnologias fundamentais do desenvolvimento web:

Tecnologia	Aplicação
HTML5	Estruturação da aplicação
CSS3	Estilização e responsividade
JavaScript	Lógica, funcionalidades e manipulação do DOM
LocalStorage	Persistência local dos dados
ARIA	Recursos de acessibilidade
📂 Estrutura do Projeto
text
mais-horas/
│
├── index.html
│
├── styles.css
│
├── app.js
│
└── README.md

🚀 Como Executar o Projeto

Não é necessário instalar dependências ou configurar um servidor para utilizar a versão atual.

Clone o repositório:
bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

Acesse a pasta do projeto:
bash
cd mais-horas

Abra o arquivo index.html em um navegador.

Também é possível utilizar a extensão Live Server no Visual Studio Code para executar a aplicação em um servidor local.

💡 Como Utilizar
Configure seu curso: informe o nome do curso, a quantidade de períodos e as metas de horas.
Acesse o painel: acompanhe o progresso geral e individual das horas.
Cadastre atividades: registre projetos de extensão ou atividades extracurriculares.
Anexe certificados: envie imagens ou PDFs como comprovantes das atividades realizadas.
Gerencie seus registros: edite ou exclua atividades sempre que necessário.
Acompanhe sua evolução: consulte o dashboard para verificar quantas horas já foram cumpridas e quantas ainda faltam.
🔒 Armazenamento e Privacidade

Atualmente, os dados são armazenados localmente no navegador por meio do localStorage.

Isso significa que:

Os dados permanecem disponíveis no mesmo navegador e dispositivo.
Não existe sincronização automática entre dispositivos.
A limpeza dos dados do navegador pode ocasionar a perda dos registros.
Os certificados são armazenados localmente como dados codificados em Base64.

Atenção: esta versão não possui autenticação, armazenamento em nuvem ou mecanismos de backup automático.

♿ Compromisso com a Acessibilidade

O + Horas busca oferecer uma experiência acessível, considerando boas práticas de desenvolvimento inclusivo, como navegação por teclado, semântica HTML, atributos ARIA e comunicação dinâmica com tecnologias assistivas.

🔮 Melhorias Futuras

Algumas funcionalidades que podem ser implementadas em versões futuras:

Autenticação e cadastro de usuários.
Integração com banco de dados.
Sincronização de dados na nuvem.
Exportação de relatórios em PDF.
Backup e restauração de dados.
Filtros e pesquisa de atividades.
Histórico de alterações.
Gráficos de desempenho acadêmico.
Interface adaptada para dispositivos móveis.
Compartilhamento de relatórios de atividades.
🤝 Contribuição

Contribuições são bem-vindas!

Caso queira sugerir melhorias, identificar problemas ou contribuir com o desenvolvimento:

Faça um fork do projeto.
Crie uma branch para sua contribuição.
Realize as alterações desejadas.
Envie um Pull Request.
📄 Licença

Este projeto ainda não possui uma licença de distribuição definida.

+ Horas — Organize suas atividades, acompanhe suas conquistas e tenha mais controle sobre sua jornada acadêmica! 🎓
