import { FaCheckCircle } from "react-icons/fa";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Label from "../UI/Label";
import LoginImage from "./loginImage";
import { useState } from "react";

interface Promps {
  registration: boolean;
}

export default function Login(promps: Promps) {
  const { registration } = promps;
  const [isRegistration, setIsRegistration] = useState(registration);

  const action = isRegistration
    ? "http//localhost:4000/signup"
    : "http//localhost:4000/signin";

  return (
    <form className="grid gap-1" method="POST" action={action}>
      <LoginImage />
      {isRegistration && (
        <>
          <Label htmlFor="username">Nombre de usuario</Label>
          <Input
            type="text"
            required
            placeholder="Ingrese un nombre de usuario"
            name="username"
          />
        </>
      )}
      <Label htmlFor="username">Email</Label>
      <Input
        type="email"
        required
        placeholder="Ingrese un email"
        name="email"
      />
      <Label htmlFor="password">Contraseña</Label>
      <Input
        type="password"
        placeholder="Ingrese una contraseña"
        required
        name="password"
      />
      {isRegistration && (
        <>
          <Label htmlFor="confirm-password">Confirma la Contraseña</Label>
          <Input
            type="password"
            placeholder="Repita la contraseña"
            required
            name="confirm-password"
          />
        </>
      )}
      <a
        onClick={() => setIsRegistration(!isRegistration)}
        className="text-blue-800"
      >
        {isRegistration ? (
          <p>
            Ya estas registrado? <strong>Inicia sesion</strong>
          </p>
        ) : (
          <p>
            No tienes una cuenta? <strong>Registrate Aqui</strong>
          </p>
        )}
      </a>
      <div className="justify-items-center justify-self-center h-15 py-2 w-100 relative">
        <Button type="submit" color="blue" icon={<FaCheckCircle />}>
          {registration ? "Registrar" : "Iniciar sesion"}
        </Button>
      </div>
    </form>
  );
}
