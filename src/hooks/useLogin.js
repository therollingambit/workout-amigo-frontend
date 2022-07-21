import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () =>  {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false)
      setError(data.error)
    }
    if (response.ok) {
      // save user to local storage
      localStorage.setItem('user', JSON.stringify(data))
      // update auth context
      dispatch({ type: 'LOGIN', payload: data })

      setIsLoading(false);
    }
  }

  return { login, isLoading, error }
}