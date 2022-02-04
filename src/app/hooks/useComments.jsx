import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import commentService from "../service/commentService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users";

const CommentsContex = React.createContext();

export const useComments = () => {
    return useContext(CommentsContex);
};

const CommentsProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState({});
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());

    // const [error, setError] = useState(null);

    useEffect(() => {
        getComments();
    }, [userId]);

    async function createComment(data) {
        const comment = {
            ...data,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId,
            _id: nanoid()
        };
        try {
            const { content } = await commentService.createComment(comment);
            setComments((prevState) => [...prevState, content]);
            setLoading(false);
        } catch (error) {
            errorCather(error);
        }
    }

    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId);
            setComments(content);
        } catch (error) {
            errorCather(error);
        } finally {
            setLoading(false);
        }
    }

    async function removeComment(id) {
        try {
            const { content } = await commentService.removeComment(id);
            if (content === null) {
                setComments((prevState) =>
                    prevState.filter((comment) => comment._id !== id)
                );
            }
        } catch (error) {
            errorCather(error);
        }
    }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function errorCather(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }

    return (
        <CommentsContex.Provider
            value={{
                comments,
                createComment,
                isLoading,
                getComments,
                removeComment
            }}
        >
            {children}
        </CommentsContex.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf[PropTypes.node],
        PropTypes.node
    ])
};

export default CommentsProvider;
