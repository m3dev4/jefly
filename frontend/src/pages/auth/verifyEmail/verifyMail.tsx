import React from 'react';
import AuthTitleDesc from '../../../components/auth/authTitleDesc';
import VerifyMailComponent from '../../../components/auth/verifyMail';

const VerifyMail = () => {
  return (
    <div className="flex flex-col space-y-2 justify-start items-start w-full h-full px-5 mt-2">
      <AuthTitleDesc
        title="Vérifiez votre"
        span="compte"
        description="Un code a été envoyé à votre-email@exemple.com"
      />
      <VerifyMailComponent />
    </div>
  );
};

export default VerifyMail;
