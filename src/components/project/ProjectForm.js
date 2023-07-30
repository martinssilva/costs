import { useEffect, useState } from 'react';

import styles from './ProjectForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';

import SubmitButton from '../form/SubmitButton';

const ProjectForm = ({btnText, handleSubmit, projectData}) => {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {})

    useEffect(() =>{
        //fetch dentro do useEffect pois o react não lida bem com a parte de receber a requisição e renderiza-la.
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
        // console.log(project);
    }

    function handleCategory(e){
        setProject({...project, category:{
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
                type={'text'}
                label={'Nome Do Projeto'}
                name={'name'}
                placeholder={'insira o nome do projeto'} 
                handleOnChange={handleChange}
                value={project.name}
            />
            <Input
                label={'Orçamento do projeto'}
                name={'budget'}
                placeholder={'Insira o orçamento total'} 
                type={'number'} 
                handleOnChange={handleChange}
                value={project.budget}
            />
            <Select
                name={'category_id'}
                label={'Selecione a categoria'}
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton
                text={btnText}
            />
        </form>
    )
}
export default ProjectForm
