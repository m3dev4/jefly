import AuthTitleDesc from '../../../components/auth/authTitleDesc';
import LoginComponent from '../../../components/auth/login';

const Login = () => {
  return (
    <div className="flex flex-col space-y-2 justify-start items-start w-full h-full px-5 mt-2">
      <AuthTitleDesc
        title="Connectez-"
        span="vous"
        description="Heureux de vous revoir"
      />
      <LoginComponent />
    </div>
  );
};

export default Login;
