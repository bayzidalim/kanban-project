export default function Button({ onClick, children, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
