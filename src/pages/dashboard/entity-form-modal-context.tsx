import { createContext, useContext, useState } from "react";

const EntityFormModalContext = createContext<{
  entityId: string | null;
  isOpen: boolean;
  setEntityId: React.Dispatch<React.SetStateAction<string | null>>;
  open: (entityId: string | null) => void;
  close: () => void;
}>({
  entityId: null,
  isOpen: false,
  setEntityId: () => null,
  open: () => null,
  close: () => null,
});

export const useEntityFormModal = () => useContext(EntityFormModalContext);

export function EntityFormModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [entityId, setEntityId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = (entityId: string | null) => {
    setEntityId(entityId);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  return (
    <EntityFormModalContext.Provider
      value={{ entityId, isOpen, setEntityId, open, close }}
    >
      {children}
    </EntityFormModalContext.Provider>
  );
}
