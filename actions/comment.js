import config from '../common/config';
import request from '../common/request';
import * as types from './actionTypes';

export const sendComment = comment => {
    return (dispatch, getState) => {
        const url = config.api.comment;
        const { user: { accessToken } } = getState().get('app');

        const body = {
            accessToken,
            comment
        };

        return request
            .post(url, body)
            .then(data => {
                if (data && data.success) {
                    let commentList = data.data;

                    dispatch({
                        type: types.SEND_COMMENTS_FULLFILLED,
                        payload: {
                            commentList: commentList,
                            commentTotal: data.total
                        }
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: types.SEND_COMMENTS_REJECTED,
                    payload: {
                        err: err
                    }
                });
            });
    };
};

export const fetchComments = (cid, feed) => {
    return (dispatch, getState) => {
        let url = config.api.comment;
        let isCommentLoadingTail = false;
        let isCommentRefreshing = false;
        // let comment;
        let id = '';

        // const { creationId, commentList } = getState().get('comments');

        const { user: { accessToken } } = getState().get('app');

        /* if (feed === 'recent') {
            isCommentRefreshing = true;
            comment = commentList[0];
        } else {
            isCommentLoadingTail = true;
            comment = commentList[commentList.length - 1];
        } */

        // if (comment && comment._id) {
        //     if (cid === creationId) {
        //         id = comment._id;
        //     }
        // }

        // console.log('=======commentList=========', commentList)

        dispatch({
            type: types.FETCH_COMMENTS_START,
            payload: {
                creationId: cid,
                isCommentLoadingTail: isCommentLoadingTail,
                isCommentRefreshing: isCommentRefreshing
            }
        });

        request
            .get(url, {
                accessToken,
                feed,
                cid,
                id
            })
            .then(data => {
                if (data && data.success) {
                    // let newCommentList = [];

                    // if (data.data.length > 0) {
                    //     if (feed === 'recent') {
                    //         newCommentList = data.data.concat(commentList);
                    //     } else {
                    //         newCommentList = commentList.concat(data.data);
                    //     }

                    //     if (cid !== creationId) {
                    //         newCommentList = data.data;
                    //     }
                    // }

                    dispatch({
                        type: types.FETCH_COMMENTS_FULLFILLED,
                        payload: {
                            commentList: data.data,
                            commentTotal: data.total,
                            isCommentLoadingTail: false,
                            isCommentRefreshing: false
                        }
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: types.FETCH_COMMENTS_REJECTED,
                    payload: {
                        err: err,
                        isCommentLoadingTail: false,
                        isCommentRefreshing: false
                    }
                });
            });
    };
};
