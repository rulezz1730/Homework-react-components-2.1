import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import TextField from "../../common/form/textField";
// import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import { useAuth } from "../../../hooks/useAuth";
import { useProfession } from "../../../hooks/useProfession";
import { useQuality } from "../../../hooks/useQuality";
import { useParams } from "react-router-dom";

const EditUserPage = () => {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState({});

    const { currentUser, updateUserData } = useAuth();
    const { professions, isLoading: isProfessionLoading } = useProfession();
    const { qualities, isLoading: isQualitiesLoading } = useQuality();
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const { userId } = useParams();

    if (currentUser._id !== userId) {
        history.push(`/users/${currentUser._id}/edit`);
    }

    const transformUserQualitiesForRender = (qualData, user) => {
        const qualitiesData = [];
        const { qualities } = user;
        for (const q of qualData) {
            for (const qual of qualities) {
                if (qual === q._id) {
                    qualitiesData.push({ label: q.name, value: q._id });
                }
            }
        }
        setUser({ ...user, qualities: qualitiesData });
    };

    useEffect(() => {
        transformUserQualitiesForRender(qualities, currentUser);
    }, [currentUser, qualities]);

    const transformUserQualitiesForLoad = (userQualities) => {
        const newQualities = userQualities.map((q) => q.value);
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
        },
        profession: {
            isRequired: {
                message: "Необходимо обязательно выбрать профессию"
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
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        await updateUserData({
            ...user,
            qualities: transformUserQualitiesForLoad(user.qualities)
        });
        history.goBack();
    }

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
                    {user || !isProfessionLoading || !isQualitiesLoading ? (
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
                                defaultOption="Choose profession"
                                name="profession"
                                value={user.profession}
                                options={professions}
                                onChange={handleChange}
                                error={errors.profession}
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
                                options={qualitiesList}
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
