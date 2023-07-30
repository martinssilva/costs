import styles from './Input.module.css';
const Input = ({label, type, name, placeholder, handleOnChange, value }) => {
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{label}</label>
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                id={name} 
                onChange={handleOnChange}
                value={value}
            />
        </div>
    )
}

export default Input;