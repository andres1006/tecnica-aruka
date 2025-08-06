import { type UserResponse } from "../../types/user";
import { LoadingSpinner } from "./LoadingSpinner";
import { UserCard } from "./UserCard";
import { EmptyState } from "./EmptyState";

interface UserListProps {
  users: UserResponse[];
  isLoading: boolean;
  onRemoveUser: (id: number) => void;
}

export const UserList = ({ users, isLoading, onRemoveUser }: UserListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Usuarios Registrados ({users.length})
      </h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : users.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onRemove={onRemoveUser}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 