import styles from './Select.module.css';
const Select = ({label, name, handleOnChange, options,  value }) => {
    
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{label}</label>
            <select
                name={name} 
                id={name} 
                onChange={handleOnChange}
                value={value || ''}
            >
                <option>Selecione uma opção</option>
                {/**Usando o .map para mostrar as opções vindas como json como props na pagina ProjectForm */}
                {options.map((option) => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select;