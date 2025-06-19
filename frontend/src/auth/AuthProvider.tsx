import {
  useContext,
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";


interface AuthContextProps {
  user: { userId: string } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, confirmPassword: string) => Promise<void>;
  checkSession: ()=> Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<{ userId: string } | null>(null);


  async function checkSession() {
    try {
      const response = await fetch("http://localhost:4000/user/session", {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error al verificar sesion: ", error);
      setUser(null);
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  async function signup(email: string, password: string, confirmPassword: string) {
    try {
      const response = await fetch("http://localhost:4000/user/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, "confirm-password": confirmPassword }),
      });

      if (response.ok) {
        const message = await response.json()
        console.log(message)
      }
    } catch (error) {
      throw error;
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await fetch("http://localhost:4000/user/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        await checkSession();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Fallo de autentificacion");
      }
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      const response = await fetch("http://localhost:4000/user/logout", {
        method: "GET",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
      }
    } catch (error) {
      console.error("Error en logout", error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, checkSession, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
