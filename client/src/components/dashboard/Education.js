import React, { Fragment } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';

import { deleteEducation } from '../../actions/profile';
import formatDate from '../../utils/formatDate';

const Education = () => {
    // Access the redux dispatch function
    const dispatch = useDispatch();

    // retrieve state from redux store
    const education = useSelector(state => 
      state.profile.profile.education
    );

    const result = education.map((edu) => (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td>{edu.degree}</td>
          <td className="hide-sm">
            {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Present'}
          </td>
          <td>
            <button
              onClick={() => dispatch(deleteEducation(edu._id))}
              className="btn btn-danger">
              <i className="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      ));

    return (
        <Fragment>
            <h2 className="mt-2">Your Education</h2>
            <hr className="mb-2"/>
            <table className="table">
                <thead>
                    <tr>
                    <th>Institution</th>
                    <th>Title</th>
                    <th className="hide-sm">Years</th>
                    <th />
                    </tr>
                </thead>
                <tbody>{result}</tbody>
            </table>
      </Fragment>
    );
};

export default Education;
