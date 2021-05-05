import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import formatDate from '../../utils/formatDate';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
    postId,
    comment: { _id, text, name, avatar, user, date }
  }) => {
    // Access the redux dispatch function
    const dispatch = useDispatch();

    // retrieve state from redux store
    const loading = useSelector(state => state.auth.loading);
    const userId = useSelector(state => state.auth.user._id);

    return (
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}>
                    <img className="round-img" src={avatar} alt={name} />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{text}</p>
                <p className="post-date">Posted on {formatDate(date)}</p>
                {!loading && user === userId && (
                    <button
                        onClick={() => dispatch(deleteComment(postId, _id))}
                        type="button"
                        className="btn btn-danger">
                        <i className="fas fa-trash" />
                    </button>
                )}
            </div>
        </div>
    );
};


CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired
};

export default CommentItem;