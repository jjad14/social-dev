import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// Redux
import { useDispatch } from 'react-redux';

import { addEducation } from '../../actions/profile';

const AddEducation = () => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });
    
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        description,
        current
    } = formData;

    // Access the redux dispatch function
    const dispatch = useDispatch();

    // gives access to the history instance 
    const history = useHistory();

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(addEducation(formData, history));
    };

    return (
        <Fragment>
            <h1 className="large text-primary">Add Your Education</h1>
            <p className="lead">
                <i className="fas fa-code-branch"/> 
                &nbsp;Add the institution or other learning services you completed in the past
            </p>
            <small>
                <span className="text-danger">*</span> required field
            </small>
            <form
                className="form"
                onSubmit={onSubmitHandler}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Institution (or any other learning services)"
                        name="school"
                        value={school}
                        onChange={onChangeHandler}
                        required/>
                    <small>
                        <span className="text-danger">*</span>&nbsp;
                        required
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Degree, Diploma or Certificate"
                        name="degree"
                        value={degree}
                        onChange={onChangeHandler}
                        required/>
                    <small>
                        <span className="text-danger">*</span>&nbsp;
                        required
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Field of Study"
                        name="fieldofstudy"
                        value={fieldofstudy}
                        onChange={onChangeHandler}/>
                    <small>
                        i.e. Computer Science
                    </small>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input 
                        type="date" 
                        name="from" 
                        value={from} 
                        onChange={onChangeHandler} />               
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            checked={current}
                            value={current}
                            onChange={() => setFormData({ ...formData, current: !current })}/>
                        &nbsp;Current School
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        value={to}
                        onChange={onChangeHandler}
                        disabled={current}/>
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Education Description"
                        value={description}
                        onChange={onChangeHandler}/>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
};

export default AddEducation;