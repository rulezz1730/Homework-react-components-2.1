import React, { useState, useEffect } from "react";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import PropTypes from "prop-types";
import api from "../../../api";
import { validator } from "../../../utils/validator";
const initialData = { userId: "", content: "" };

const AddNewComment = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Необходимо обязательно выбрать пользователя"
            }
        },

        content: {
            isRequired: {
                message: "Комментарий обязателен для заполнения"
            }
        }
    };

    useEffect(() => {
        api.users.fetchAll().then(setUsers);
    }, []);

    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    useEffect(() => {
        validate();
    }, [data]);

    const isValid = Object.keys(errors).length === 0;

    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            name: users[userId].name,
            _id: users[userId]._id
        }));

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    label="Выберите пользователя"
                    options={arrayOfUsers}
                    onChange={handleChange}
                    name="userId"
                    value={data.userId}
                    defaultOption="Выберите пользователя"
                    error={errors.userId}
                />

                <TextAreaField
                    label="Сообщение"
                    name="content"
                    onChange={handleChange}
                    value={data.content}
                    error={errors.content}
                />
                <button
                    className="btn btn-primary float-end"
                    disabled={!isValid}
                >
                    Опубликовать
                </button>
            </form>
        </div>
    );
};

AddNewComment.propTypes = {
    onSubmit: PropTypes.func
};

export default AddNewComment;
