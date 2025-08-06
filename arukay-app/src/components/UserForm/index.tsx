import { useUserForm } from "../../hooks/useUserForm";
import { ErrorMessage } from "./ErrorMessage";
import { UserFormComponent } from "./UserFormComponent";
import { UserList } from "./UserList";

const UserForm = () => {
  const {
    users,
    formData,
    errors,
    isSubmitting,
    isLoading,
    apiError,
    handleInputChange,
    handleSubmit,
    removeUser,
  } = useUserForm();

  return (
    <div className="w-screen h-screen max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Gestión de Usuarios
      </h1>

      <ErrorMessage error={apiError} />

      <UserFormComponent
        formData={formData}
        errors={errors}
        isSubmitting={isSubmitting}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />

      <UserList users={users} isLoading={isLoading} onRemoveUser={removeUser} />
    </div>
  );
};

export default UserForm;
