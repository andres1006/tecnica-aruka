import { type UserResponse } from "../../types/user";
import { formatDate } from "../../utils/dateUtils";

interface UserCardProps {
  user: UserResponse;
  onRemove: (id: number) => void;
}

export const UserCard = ({ user, onRemove }: UserCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{user.name}</h3>
        <p className="text-gray-600 text-sm">{user.email}</p>
        <p className="text-gray-500 text-xs">
          Nacimiento: {formatDate(user.birth_date)} | Edad: {user.age}{" "}
          años
        </p>
        <p className="text-gray-400 text-xs">
          Registrado:{" "}
          {new Date(user.created_at).toLocaleDateString("es-ES")}
        </p>
      </div>
      <DeleteButton onRemove={() => onRemove(user.id)} />
    </div>
  );
};

interface DeleteButtonProps {
  onRemove: () => void;
}

const DeleteButton = ({ onRemove }: DeleteButtonProps) => {
  return (
    <button
      onClick={onRemove}
      className="ml-4 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1 transition-colors"
      title="Eliminar usuario"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  );
}; 