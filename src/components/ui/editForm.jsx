import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { useParams } from "react-router";
import api from "../../api/";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";

const EditForm = () => {
    const [user, setUser] = useState();
    const [professions, setProfessions] = useState();
    const [qualities, setQualities] = useState();

    const { userId } = useParams();

    useEffect(() => {
        api.users
            .getById(userId)
            .then((user) => setUser({ ...user, email: "", sex: "" }));
        api.professions.fetchAll().then((prof) => setProfessions(prof));
        api.qualities.fetchAll().then((qual) => setQualities(qual));
    }, []);

    useEffect(() => {
        console.log(user);
    }, [user]);

    const handleChange = (target) => {
        console.log(target);
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    if (user && qualities) {
        const userQual = user.qualities.map((qual) => {
            return {
                label: qual.name,
                value: qual._id
            };
        });
        console.log(userQual);
        // console.log(userQualities);
        return (
            <form>
                <TextField
                    label="Имя"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Электронная почта"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
                <SelectField
                    label="Выберите свою профессию"
                    value={user.profession.name}
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
                    value={userQual}
                />
            </form>
        );
    }
    return "Loading...";
};

export default EditForm;
