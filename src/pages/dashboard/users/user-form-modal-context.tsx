import { createContext, useContext, useState } from "react";

const UserFormModalContext = createContext<{
  userId: string | null;
  isOpen: boolean;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  openModal: (userId: string | null) => void;
  closeModal: () => void;
}>({
  userId: null,
  isOpen: false,
  setUserId: () => null,
  openModal: () => {},
  closeModal: () => {},
});

export const useUserFormModal = () => useContext(UserFormModalContext);

export function UserFormModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (userId: string | null) => {
    setUserId(userId);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <UserFormModalContext.Provider
      value={{ userId, isOpen, setUserId, openModal, closeModal }}
    >
      {children}
    </UserFormModalContext.Provider>
  );
}
