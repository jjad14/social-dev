import React, { Fragment } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';

import { deleteExperience } from '../../actions/profile';
import formatDate from '../../utils/formatDate';

const Experience = () => {
    // Access the redux dispatch function
    const dispatch = useDispatch();

    // retrieve state from redux store
    const experience = useSelector(state => 
      state.profile.profile.experience
    );
    
    const result = experience.map((exp) => (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td className="">{exp.title}</td>
          <td className="hide-sm">
            {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Present'}
          </td>
          <td>
            <button
              onClick={() => dispatch(deleteExperience(exp._id))}
              className="btn btn-danger">
              <i className="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      ));

    return (
        <Fragment>
            <h2 className="mt-2">Your Experience</h2>
            <hr className="mb-2"/>
            <table className="table">
                <thead>
                    <tr>
                      <th>Company</th>
                      <th className="">Title</th>
                      <th className="hide-sm">Years</th>
                      <th />
                    </tr>
                </thead>
                <tbody>{result}</tbody>
            </table>
      </Fragment>
    );
};

export default Experience;
