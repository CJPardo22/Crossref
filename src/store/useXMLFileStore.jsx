import { create } from "zustand";

const useXMLFileStore = create((set) => ({
  xmlContent: null,
  setXMLContent: (content) => set({ xmlContent: content }),
}));

export default useXMLFileStore;
