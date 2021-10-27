import React, { useState, useEffect } from "react";
import _ from "lodash";
import { useParams } from "react-router";
import AddNewComment from "../../common/comments/addNewComment";
import CommentsList from "../../common/comments/commentsList";
import api from "../../../api";
import PropTypes from "prop-types";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);
    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };

    useEffect(() => {
        console.log(comments);
    }, [comments]);

    const handleRemoveComment = (id) => {
        api.comments
            .remove(id)
            .then((id) => setComments(comments.filter((x) => x._id !== id)));
    };

    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddNewComment onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb=3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

Comments.propTypes = {
    thisUserId: PropTypes.string
};

export default Comments;
