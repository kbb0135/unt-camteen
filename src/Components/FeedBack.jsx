import React from "react"

const Input = ({placeholder, name, label}) => {
    return <div>
        <label>{label}</label>
        <input placeholder={placeholder} name={name} className="feedback-input" required/>
    </div>
}
const Feedback = () => {
    return <div className="feedback">
        <div>
            <div>
                <h3 className="feedback-head">Provide us your feedback</h3>
                <p className="feedback-subhead">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
        <form className="feedback-form">
            <Input name='fullName' placeholder='John Wick' label='Full Name' />
            <Input name='email' placeholder='john@wick.com' label='Email' />
            <textarea  rows='3'></textarea>
            <button className="feedback-submit">Submit</button>
        </form>
        </div>
        
        <div className="feedback-img-box" role="img" aria-label="enjoying food">
            
        </div>
    </div>
}
export default Feedback; 