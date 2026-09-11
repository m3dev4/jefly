interface AuthTitleDescProps {
  title: string;
  description: string;
  span: string;
}

const AuthTitleDesc = ({ title, description, span }: AuthTitleDescProps) => {
  return (
    <div className="flex flex-col space-y-2 items-start">
      <h2 className="text-3xl font-bold font-heading">
        {title} <span className="text-secondary-jefly">{span}</span>
      </h2>
      <p className="text-gray-600 text-sm font-sans pl-0.5">{description}</p>
    </div>
  );
};

export default AuthTitleDesc;
