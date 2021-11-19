export default function Button(props) {
  const { variant } = props;

  const variants = {
    primary:
      'bg-yellow-500 border-yellow-500 focus:border-yellow-300 text-white',
    secondary:
      'bg-yellow-100 hover:bg-yellow-200 text-yellow-500 border-transparent focus:border-yellow-400',
    outline:
      'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-100 focus:border-yellow-300',
  };

  return (
    <button
      className={`p-2 pl-5 pr-5 bg-transparent border-2 text-lg rounded-lg focus:border-4 transition duration-100 w-full block text-center ${
        variants[variant] || variants['primary']
      }`}
      {...props}
    />
  );
}
