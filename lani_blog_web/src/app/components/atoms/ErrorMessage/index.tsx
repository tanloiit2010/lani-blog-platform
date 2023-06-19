interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message = "Something when wrong" }) => {
  return <div className="mt-8 text-red-600 text-lg text-center">{message}</div>;
};

export default ErrorMessage;
