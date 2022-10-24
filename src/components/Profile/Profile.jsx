import { useEffect, useContext, useState } from 'react';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';

import './Profile.css';

export default function Profile({ handleSignOut, handleProfile }) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  const [requirementValidity, setRequirementValidity] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    handleProfile(values);
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  useEffect(() => {
    setRequirementValidity(isValid && (currentUser.name !== values.name || currentUser.email !== values.email));
  }, [currentUser, isValid, values]);


  return (
    <main className="profile">
      <form
        className="profile__form"
        name="profile"
        noValidate
        onSubmit={handleSubmit}
      >
        <h1 className="profile__title">Привет, Елизавета!</h1>
        <div className="profile__labels-container">
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              name="name"
              className={`profile__input ${
                errors.name && 'profile__input_error'
              }`}
              onChange={handleChange}
              value={values.name}
              type="text"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="profile__error-name">{errors.name || ''}</span>
          </label>
          <label className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              name="email"
              className={`profile__input ${
                errors.email && 'profile__input_error'
              }`}
              onChange={handleChange}
              value={values.email}
              type="email"
              required
            />
            <span className="profile__error">{errors.email || ''}</span>
          </label>
        </div>
        <div className="profile__button-container">
          <button
            type="submit"
            className={`profile__button-edit ${
              !requirementValidity && 'profile__button-edit_disabled'
            }`}
            disabled={requirementValidity ? false : true}
          >
            Редактировать
          </button>
          <button type="button" className="profile__button-exit" onClick={handleSignOut}>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}
