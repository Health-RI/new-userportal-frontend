import { createContext, useContext } from "react";

const AttachmentUploadContext = createContext(null);

type AttachmentUploadProviderProps = {
  children: React.ReactNode;
};

function AttachmentUploadProvider({ children }: AttachmentUploadProviderProps) {
  return (
    <AttachmentUploadContext.Provider value={null}>
      {children}
    </AttachmentUploadContext.Provider>
  );
}

function useAttachmentUpload() {
  const context = useContext(AttachmentUploadContext);
  if (context === null) {
    throw new Error(
      "useAttachmentUpload must be used within a AttachmentUploadProvider",
    );
  }
  return context;
}

export { AttachmentUploadProvider, useAttachmentUpload };
