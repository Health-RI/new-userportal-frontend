import { Form, RetrievedApplication } from "@/types/application.types";
import FieldAttachmentContainer from "./fieldAttachmentContainer";

type FormContainerProps = {
  form: Form;
  application: RetrievedApplication;
  setApplication: React.Dispatch<React.SetStateAction<RetrievedApplication>>;
};

function FormContainer({
  form,
  application,
  setApplication,
}: FormContainerProps) {
  const title = form.externalTitle.find(
    (label) => label.language === "en",
  )?.name;
  return (
    <div className="mt-10 rounded">
      <h3 className="text-2xl text-primary">{title}</h3>
      <ul>
        {form.fields.map((field) => (
          <li key={field.id}>
            <FieldAttachmentContainer
              field={field}
              formId={form.id}
              application={application}
              setApplication={setApplication}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormContainer;
