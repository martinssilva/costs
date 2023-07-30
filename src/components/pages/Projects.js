// Importando hooks necessários, componentes e módulo CSS
import { useEffect, useState } from 'react';  // Hooks para efeitos secundários e gerenciamento de estado
import Message from '../layout/Message';  // Componente de mensagem
import { useLocation } from 'react-router-dom';  // Hook para acessar o objeto de localização atual
import styles from './Projects.module.css';  // Estilos CSS para este componente
import Container from '../layout/Container';  // Componente de container
import ProjectCard from '../project/ProjectCard';  // Componente de cartão do projeto
import LinkButton from '../layout/LinkButton';  // Componente de botão de link
import Loading from '../layout/Loading'; //Componente de Carregamento

// Define o componente Projects
const Projects = () => {
    // Usa o hook useState para gerenciar o estado 'projetos'. O valor inicial é um array vazio
    const [projetos, setProjetos] = useState([]);

    // Definindo uma variavel para armazenar o local do banco, geralmente nas aplicações essa variavel aponta para as variaveis de ambiente que ficam escondidas, caso alguém queira usa-las.
    const apiAdress = "http://localhost:5000/projects";

    // Hook para gerenciar o estado do carregamento(se ele vai ser mostrado ao usuario ou não. Começa mostrando o loadder.)
    const [showLoading, setShowLoading] = useState(true);

    // Hook para definir mensagem que vai aparecer dependendo do que ocorrer no sistema, como um DELETE por exemplo.
    const [projectMessage, setProjectMessage] = useState('');

    // Usando o hook useLocation para acessar o objeto de localização atual
    const location = useLocation();
    // Definindo uma mensagem padrão
    let message = '¿Hola que pasas?';

    // Se existir um objeto de estado na localização (por exemplo, passado via Link), 
    // atualiza a variável 'message'
    if(location.state){
        message = location.state.message
    }

    // O hook useEffect executa efeitos secundários após a renderização. 
    // Aqui ele é usado para buscar os dados dos projetos do servidor quando o componente é montado
    useEffect(() => {
        fetch(apiAdress,{
            method: 'GET',  // O método HTTP é GET
            headers: {
                'Content-type': 'application/json',  // O tipo de resposta esperado é JSON
            },
        })
        .then((response) => response.json())  // Converte a resposta para JSON
        .then((data) => {
            console.log(data)  // Registra os dados para depuração
            setProjetos(data);  // Define os dados buscados para o estado 'projetos'
            setShowLoading(false) // Define o Loadder como falso(para de mostra-lo).
        })
        .catch((error) => {
            console.error('Error:', error);  // Captura quaisquer erros e os registra
        });
    }, []);  // Array de dependência vazio significa que este efeito é executado uma vez na montagem e não nas atualizações

    // Define a função 'removeProject'
    function removeProject(id){
        
        // Inicia uma solicitação fetch para a API
        // A string de modelo `${apiAdress}/${id}` cria a URL para o recurso específico que você deseja excluir
        // `${apiAdress}` é o endereço base da API e `${id}` é o identificador único do projeto
        fetch(`${apiAdress}/${id}`,{
            method: 'DELETE', // O método HTTP é DELETE, que é usado para excluir um recurso
            headers:{
                'Content-Type': 'application/json' // O tipo de conteúdo dos dados enviados é JSON
            },
        })
        // A resposta é convertida em JSON
        .then(resp => resp.json())
        // A função then recebe os dados JSON
        .then(data =>{
            // A função setProjetos atualiza o estado 'projetos'
            // O método filter é usado para criar um novo array com todos os projetos que têm um 'id' diferente do 'id' do projeto excluído
            setProjetos(projetos.filter((projeto) => projeto.id !== id));
            // define a mensagem que vai aparecer na tela quando for excluido um projeto do sistema.
            setProjectMessage('Projeto removido com sucesso');
        })
        // Se houver um erro na solicitação, ele será registrado no console
        .catch(err => console.log(err))
    }


    // O componente retorna uma estrutura JSX
    return( 
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton text={'Criar Projetos'} to={'/newproject'}/>  {/*Um botão para criar novos projetos*/}
            </div>
            {message && <Message msg={message} type={'success'}/> }{/*Renderiza condicionalmente o componente de Mensagem se 'message' é verdadeiro*/}
            {projectMessage && <Message msg={projectMessage} type={'success'}/> }{/*Renderiza condicionalmente o componente de Mensagem se 'message' é verdadeiro*/}
            <Container customClass='start'>
                {/* Renderiza condicionalmente os cartões do projeto se o array 'projetos' tiver algum item */}
                {projetos.length > 0 &&
                    projetos.map((projeto) => (
                    <ProjectCard 
                    id={projeto.id}
                    name={projeto.name}
                    budget={projeto.budget}
                    category={projeto.category.name}
                    key={projeto.id}
                    handleRemove={removeProject}
                    />
                ))}
                {showLoading && <Loading />}
                {!showLoading && projetos.length === 0 &&(
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    )
}
export default Projects  // Exporta o componente Projects para uso em outros módulos
