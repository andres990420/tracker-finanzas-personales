import { FaCheckCircle } from "react-icons/fa";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Label from "../UI/Label";
import LoginImage from "./loginImage";
import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";

interface Promps {
  setModalActive: (modal: string) => void;
  switchModal: (modalToActive: string) => void;
}
export default function Register(promps: Promps) {
  const { setModalActive, switchModal: swicthModal } = promps;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, confirmPassword);
      await login(email, password);
      console.log("Registro completado");
      setModalActive("register");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="grid gap-1" onSubmit={handleSubmit}>
      <LoginImage />
      <Label htmlFor="username">Email</Label>
      <Input
        type="email"
        required
        placeholder="Ingrese un email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Label htmlFor="password">Contraseña</Label>
      <Input
        type="password"
        placeholder="Ingrese una contraseña"
        required
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <>
        <Label>Confirma la Contraseña</Label>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Repita la contraseña"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </>

      <a className="text-blue-800" onClick={() => swicthModal("login")}>
        <p>
          Ya estas registrado? <strong>Inicia sesion</strong>
        </p>
      </a>
      <div className="justify-items-center justify-self-center h-15 mt-5 py-2 w-100 relative">
        <Button type="submit" color="blue" icon={<FaCheckCircle />}>
          Registrar
        </Button>
      </div>
    </form>
  );
}
