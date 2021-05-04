import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';

import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';

import { getPost } from '../../actions/post';

const Post = ({ match }) => {
    
    useEffect(() => {
        dispatch(getPost(match.params.id));
        // eslint-disable-next-line
    }, [getPost, match.params.id]);

    // Access the redux dispatch function
    const dispatch = useDispatch();

    // retrieve state from redux store
    const post = useSelector(state => state.post.post);
    const loading = useSelector(state => state.post.loading);
    
    return loading || post === null ? (
      <Spinner />
    ) : (
      <Fragment>
        <Link to="/posts" className="btn">
          Back To Posts
        </Link>
        <PostItem post={post} showActions={false} />
      </Fragment>
    );
};

export default Post;