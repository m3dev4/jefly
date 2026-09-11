import React from 'react';
import AuthTitleDesc from '../../../components/auth/authTitleDesc';
import RegisterComponent from '../../../components/auth/register';

const Register = () => {
  return (
    <div className="flex flex-col space-y-2 justify-start items-start w-full h-full px-5 mt-2">
      <AuthTitleDesc
        title="Créer votre"
        span="compte"
        description="Rejoignez la plateforme dès aujourd'hui"
      />
      <RegisterComponent />
    </div>
  );
};

export default Register;
