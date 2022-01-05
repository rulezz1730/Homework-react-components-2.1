import React from "react";
import _ from "lodash";
import AddNewComment from "../../common/comments/addNewComment";
import CommentsList from "../../common/comments/commentsList";
import PropTypes from "prop-types";
import { useComments } from "../../../hooks/useComments";

const Comments = () => {
    const { createComment, comments, removeComment } = useComments();

    const handleSubmit = (data) => {
        createComment(data);
        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]));
    };

    const handleRemoveComment = (id) => {
        removeComment(id);
        // api.comments
        //     .remove(id)
        //     .then((id) => setComments(comments.filter((x) => x._id !== id)));
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
