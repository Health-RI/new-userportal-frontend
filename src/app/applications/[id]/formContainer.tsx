import { Form } from "@/types/application.types";
import FieldAttachmentContainer from "./fieldAttachmentContainer";

function FormContainer(form: Form, files: , ) {
  return (
    <form className="rounded bg-white-smoke p-3">
      <h3 className="text-xl text-primary">
        {form.externalTitle.find((label) => label.language === "en")?.name}
      </h3>
      <ul>
        {form.fields.map((field) => (
          <li key={field.id}>
            <FieldAttachmentContainer
              fieldName={
                field.title.find((title) => title.language === "en")
                  .language as string
                files={files}
                setFiles={setFiles}
              
              }
            />
          </li>
        ))}
      </ul>
    </form>
  );
}

export default FormContainer;
