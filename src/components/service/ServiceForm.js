import styles from '../project/ProjectForm.module.css';
import { useState } from 'react';
import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';

const ServiceForm = ({handleSubmit, btnText, projectData})=>{ 
    const [service, setService] = useState({})
    const submit = (e) =>{
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }
    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    const inputFields = [
        {
            type: 'text',
            label: 'Nome do serviço',
            name: 'name',
            placeholder: 'Insira o nome do serviço'
        },
        {
            type: 'number',
            label: 'Preço do serviço',
            name: 'cost',
            placeholder: 'Insira o preço do serviço'
        },
        {
            type: 'text',
            label: 'Descrição do serviço',
            name: 'description',
            placeholder: 'Insira a descrição do serviço'
        }
    ];
    return(
        <form className={styles.form} onSubmit={submit}>
            {inputFields.map((field, index) => (
                <Input 
                    key={index}
                    type={field.type}
                    label={field.label}
                    name={field.name}
                    placeholder={field.placeholder}
                    handleOnChange={handleChange}
                />
            ))}
            <SubmitButton text={btnText} />
        </form>
    )
}
export default ServiceForm