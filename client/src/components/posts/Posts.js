import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PostItem from './PostItem';
import PostForm from './PostForm';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';

const Posts = () => {
    // Access the redux dispatch function
    const dispatch = useDispatch();

    // retrieve state from redux store
    const posts = useSelector(state => state.post.posts);
    const loading = useSelector(state => state.post.loading);

    useEffect(() => {
        dispatch(getPosts());
    // eslint-disable-next-line
    }, [getPosts]);

    return loading ? <Spinner /> : (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user"/> &nbsp; 
                Welcome to the Social Dev Community
            </p>
            <PostForm />
            <div className="posts">
                {posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </Fragment>
    );
};

export default Posts;