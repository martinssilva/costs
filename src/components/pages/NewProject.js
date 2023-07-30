// Import the useNavigate hook from react-router-dom for programmatically navigating the application
import {useNavigate} from 'react-router-dom'

// Import the ProjectForm component
import ProjectForm from '../project/ProjectForm'

// Import CSS module styles for this component
import styles from './NewProject.module.css'

// Define the NewProject functional component
const NewProject = () => {

    // Instantiate the navigate function using the useNavigate hook
    const navigate = useNavigate();

    // Define a function to create a new project
    function createPost(project){
        // Initialize cost of the project to 0
        project.cost = 0;

        // Initialize services of the project as an empty array
        project.services = [];

        // Make a POST request to the server with the project object as body
        fetch("http://localhost:5000/projects", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json()) // Parsing the response to JSON
        .then((data) =>{
            console.log(data) // Logging the response data

            // Navigate to the '/projects' page with a success message
            navigate('/projects', {message: 'Projeto criado com sucesso!'})
        })
        .catch(e => console.log(e)) // Logging any errors
    }

    // Return the JSX to be rendered
    return(
        <div className={styles.newproject_container}> {/*Use CSS module for styling*/}
            <h1>Criar Projeto</h1> {/*Title of the page*/}
            <p>Crie seu projeto para depois adicionar os serviços</p> {/*Description*/}
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" /> {/*Render ProjectForm component*/}
        </div>
        )
}

// Export the NewProject component for use in other files
export default NewProject
