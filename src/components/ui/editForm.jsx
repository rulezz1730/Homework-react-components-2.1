import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import TextField from "../common/form/textField";
import api from "../../api/";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { validator } from "../../utils/validator";

const EditForm = () => {
    const [user, setUser] = useState();
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();
    const [errors, setErrors] = useState({});

    const { userId } = useParams();

    useEffect(() => {
        api.users.getById(userId).then((user) =>
            setUser({
                ...user,
                email: "",
                sex: "male",
                profession: user.profession.name
            })
        );
        api.professions.fetchAll().then((prof) => setProfessions(prof));
        api.qualities.fetchAll().then((qual) => setQualities(qual));
    }, []);

    // useEffect(() => {
    //     console.log(qualities);
    // }, [qualities]);

    // useEffect(() => {
    //     console.log(user);
    // }, [user]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [user]);

    const validate = () => {
        const errors = validator(user, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleChange = (target) => {
        console.log(target);
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (userId, data) => {
        api.users.update(userId, data);
        // history.push(`users/${userId}`);
    };

    if (user && qualities) {
        const userQual = user.qualities.map((qual) => {
            return {
                label: qual.name,
                value: qual._id
            };
        });

        console.log(userQual);
        return (
            <form>
                <TextField
                    label="Имя"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    error={errors.name}
                />
                <TextField
                    label="Электронная почта"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <SelectField
                    label="Выберите свою профессию"
                    defaultOption="Choose..."
                    value={user.profession.name}
                    options={professions}
                    onChange={handleChange}
                    // error={errors.profession}
                />

                <RadioField
                    options={[
                        { name: "Male", value: "male" },
                        { name: "Female", value: "female" },
                        { name: "Other", value: "other" }
                    ]}
                    value={user.sex}
                    name="sex"
                    onChange={handleChange}
                    label="Выберите Ваш пол"
                />
                <MultiSelectField
                    options={qualities}
                    name="qualities"
                    onChange={handleChange}
                    label="Выберите Ваши качества"
                    value={userQual}
                />
                <button
                    type="submit"
                    className="btn btn-primary w-100 mx-auto"
                    onClick={() => handleSubmit(userId, user)}
                >
                    Обновить
                </button>
            </form>
        );
    }
    return "Loading...";
};

export default EditForm;
