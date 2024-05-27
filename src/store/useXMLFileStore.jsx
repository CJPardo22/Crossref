import { create } from "zustand";
import { persist } from "zustand/middleware";

const useXMLFileStore = create(
  persist(
    (set) => ({
      xmlContent: null,
      setXMLContent: (content) => set({ xmlContent: content }),
      setchangeContentNull: (content) => set({xmlContent: null})
    }),
    {
      name: "xml-file-store", 
      getStorage: () => localStorage, 
    }
  )
);

export default useXMLFileStore;
