import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import TextField from "../../common/form/textField";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";

const EditUserPage = () => {
    const history = useHistory();
    const [user, setUser] = useState();
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();
    const [errors, setErrors] = useState({});

    const { userId } = useParams();

    useEffect(() => {
        api.users.getById(userId).then((user) =>
            setUser({
                ...user,
                email: user.email ? user.email : "",
                sex: user.sex ? user.sex : "other",
                profession: user.profession._id,
                qualities: user.qualities.map((qual) => {
                    return { label: qual.name, value: qual._id };
                })
            })
        );
        api.professions.fetchAll().then((prof) => setProfessions(prof));
        api.qualities.fetchAll().then((qual) => setQualities(qual));
    }, []);

    const getProfessionById = (professionId) => {
        for (const prof in professions) {
            if (professions[prof]._id === professionId) {
                return professions[prof];
            }
        }
    };

    const getQualitiesById = (userQualities) => {
        const newQualities = [];
        for (const qualUser of userQualities) {
            for (const qual in qualities) {
                if (qualUser.value === qualities[qual]._id) {
                    newQualities.push(qualities[qual]);
                }
            }
        }
        console.log(newQualities);
        return newQualities;
    };

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
        console.log(target.name, target.value);
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.users
            .update(userId, {
                ...user,
                profession: getProfessionById(user.profession),
                qualities: getQualitiesById(user.qualities)
            })
            .then((data) => history.replace(`/users/${user._id}`));
    };

    const pressBack = () => {
        history.goBack();
    };

    const isValid = Object.keys(errors).length === 0;

    return (
        <div className="container mt-5">
            <button className="btn btn-primary" onClick={() => pressBack()}>
                Назад
            </button>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {user && professions ? (
                        <form onSubmit={handleSubmit}>
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
                                value={user.profession.value}
                                options={professions}
                                onChange={handleChange}
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
                                value={user.qualities}
                            />
                            <button
                                disabled={!isValid}
                                type="submit"
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
