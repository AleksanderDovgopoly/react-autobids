const Input = ({ label, name, type, register, required, ...otherProps }) => (
    <>
        <label>{label}</label>
        <input type={type || 'text'} {...register(name, { required })} {...otherProps} />
    </>
);

export default Input;