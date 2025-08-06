import { type User, type UserErrors } from "../../types/user";

interface UserFormComponentProps {
  formData: User;
  errors: UserErrors;
  isSubmitting: boolean;
  onInputChange: (field: keyof User, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const UserFormComponent = ({
  formData,
  errors,
  isSubmitting,
  onInputChange,
  onSubmit,
}: UserFormComponentProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Agregar Nuevo Usuario
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          label="Nombre *"
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => onInputChange("name", e.target.value)}
          error={errors.name}
          placeholder="Ingresa el nombre completo"
        />

        <FormField
          label="Email *"
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange("email", e.target.value)}
          error={errors.email}
          placeholder="ejemplo@correo.com"
        />

        <FormField
          label="Fecha de Nacimiento *"
          id="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={(e) => onInputChange("birthDate", e.target.value)}
          error={errors.birthDate}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Agregando..." : "Agregar Usuario"}
        </button>
      </form>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

const FormField = ({
  label,
  id,
  type,
  value,
  onChange,
  error,
  placeholder,
}: FormFieldProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
        max={new Date().toISOString().split("T")[0]}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
