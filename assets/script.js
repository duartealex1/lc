let app = new Vue({
  el: "#app",

  data: {
    // registros
    ListaContatos: [],
    name: "Lista de Contatos",
    autor: "Alex Duarte",
    // Objeto
    ObjetoContato: {
      // id:'',
      name: "",
      email: "",
      phone: "",
      adress: "",
      photo: "",
    },
    Editando: false,

    titulo: "Lista de Contatos teste Alfasoft 11/05/2023 Alex Duarte!",
  },

  //adicionar mais informações a uma propriedade
  computed: {
    QuantidadeContatos() {
      return `O Total de Contatos Registrados é ${this.ListaContatos.length}`;
    },
  },

  // Coletar dados
  created() {
    // ---- o contato será salvo no local storage
    if (localStorage.hasOwnProperty("contactsApp")) {
      this.ListaContatos = JSON.parse(localStorage.getItem("contactsApp"));
    }
  },

  // Métodos

  methods: {
    //contact
    SalvarContato(ObjetoContato) {
      // variável que guarda os contatos
      let ContatosArray = new Array();

      // Criar um ID para o novo registro
      ObjetoContato.id = new Date().getTime();

      if (localStorage.hasOwnProperty("contactsApp")) {
        ContatosArray = JSON.parse(localStorage.getItem("contactsApp"));

        ContatosArray.push(ObjetoContato);
      } else {
        // Contatos que estão sendo salvos
        ContatosArray = [ObjetoContato];
      }

      this.ListaContatos = ContatosArray;
      localStorage.setItem("contactsApp", JSON.stringify(ContatosArray));

      // Limpa o formulário
      location.reload();
    },

    // Remover o contato da lista
    RemoverContato(ContatoId) {
      // Variável que guarda todos os contatos criados em uma array
      let ContatosArray = new Array();
        alert('Contato excluido com sucesso!')
      // 1) Se já existir contatos registrados no local storage... ( + Checa se existe algum item no local storage )
      if (localStorage.hasOwnProperty("contactsApp")) {
       
        ContatosArray = JSON.parse(localStorage.getItem("contactsApp"));

      
        ContatosArray = ContatosArray.filter((ObjetoContato) => {
         return ObjetoContato.id != ContatoId;
        });

        this.ListaContatos = ContatosArray;

     
        localStorage.setItem("contactsApp", JSON.stringify(ContatosArray));

    
    } else {
  
        return console.log("Não tem nenhum contato registrado :<");
      }
    },

    // Editar Contato
    EditarContato(ObjetoContato) {
      // Sobrescrever o objeto contato pelo valor recebido no parâmetro
      this.ObjetoContato = ObjetoContato;

      // Aviso de edição de contato
      this.Editando = true;
    },

    // Atualizar contato
    AtualizarContato(ObjetoContato) {

      let ContatosArray = new Array();

      ContatosArray = this.ListaContatos.map((ContatoMap) => {
     
        if (ContatoMap.id == ObjetoContato.id) {
  
          return ObjetoContato;

        } else {

          return ContatoMap;
        }
      });


      this.ListaContatos = ContatosArray;

      this.Editando = false;

      // Transforma os dados em json
      localStorage.setItem("contactsApp", JSON.stringify(ContatosArray));

      // Limpa o formulário
      location.reload();
    },
  },
});

