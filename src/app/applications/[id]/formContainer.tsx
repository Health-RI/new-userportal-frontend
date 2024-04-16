import { Form } from "@/types/application.types";
import FieldContainer from "./fieldContainer";

type FormContainerProps = {
  form: Form;
};

function FormContainer({ form }: FormContainerProps) {
  const title = form.externalTitle?.find(
    (label) => label.language === "en",
  )?.name;

  return (
    <div className="mt-10 rounded">
      <h3 className="text-2xl text-primary">{title}</h3>
      <ul>
        {form.fields?.map(
          (field) =>
            field && (
              <li key={field.id}>
                <FieldContainer field={field} formId={form.id} />
              </li>
            ),
        )}
      </ul>
    </div>
  );
}

export default FormContainer;
