import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';

import { addExperience } from '../../actions/profile';

const AddExperience = () => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });
    
    const { 
        company, 
        title, 
        location, 
        from, 
        to, 
        current, 
        description 
    } = formData;

    // Access the redux dispatch function
    const dispatch = useDispatch();

    // retrieve state from redux store
    const status = useSelector(state => state.profile.profile.status);

    // gives access to the history instance 
    const history = useHistory();

    const onChangeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(addExperience(formData, history));
    };

    return (
        <Fragment>
          <h1 className="large text-primary">Add Your Experience</h1>
          <p className="lead">
            <i className="fas fa-code-branch" />&nbsp;
            Add any experience you've had becoming {status}
          </p>
          <small>
            <span className="text-danger">*</span>&nbsp;
              required field
          </small>
          <form
            className="form"
            onSubmit={onSubmitHandler}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Job Title"
                name="title"
                value={title}
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
                placeholder="Company Name"
                name="company"
                value={company}
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
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChangeHandler}/>
              <small>
                City, Province/State, Postal/Zip Code
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
                  onChange={() => {
                    setFormData({ ...formData, current: !current });
                  }}/>
                &nbsp;Current Job
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
                placeholder="Job Description"
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

export default AddExperience;
