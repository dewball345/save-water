// import "bootstrap/dist/css/bootstrap.min.css";

export function TextBox({title, onChange, type, ...props}){
    return (
        <div className="form-group">
            <label htmlFor={title}>
                {title + ":"}
            </label>
            <input 
                type={type}
                className="form-control"
                id={title}
                aria-describedby={title}
                placeholder={title + " here"}
                onChange={onChange} {...props}/>
        </div>
    );
}
