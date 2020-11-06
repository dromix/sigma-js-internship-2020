import React, { useState } from 'react';
import Button from '../button/Button';
import { useFormikContext } from 'formik';
import { postRequest } from '../../../services/apiUserService';
import { Country } from '../../constants/Countries';
import { sex } from '../../constants/constants';
import { useHistory } from 'react-router-dom';
import { FormikValues } from '../../interfaces/Interface';

const getMethodPriority = (country: keyof typeof Country) => {
  return Country[country];
};

const getSexPriority = (state: keyof typeof sex) => {
  return sex[state];
};

export const ButtonWithFormikRegister: React.FC = props => {
  const { values } = useFormikContext<FormikValues>();

  const history = useHistory();

  const submitUser = () => {
    postRequest('user/register', {
      firstName: values.name,
      lastName: values.surname,
      sex: getSexPriority(values.sex),
      email: 'fgdggfddf',
      birthday: values.birthday,
      country: values.country,
      countryCode: getMethodPriority(values.country),
      speak: values.languages,
      learn: values.learnLanguages,
      photo: values.fileUrl,
      about: values.about
    })
      .then(() => history.push('/'))
      .catch(() => history.push('/register'));
  };

  return (
    <div className="register-nav">
      <Button name="CANCEL" color="secondary" link="login" />
      <Button name="SIGN UP" color="primary" onClick={submitUser} />
    </div>
  );
};