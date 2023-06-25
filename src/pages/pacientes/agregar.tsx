
import { Action } from "src/utils/enums/Action.enum";

import FormPaciente from "src/components/Pages/FormPaciente";

export default function AgregarPaciente() {

    return (
      <FormPaciente formValues={ undefined } action={Action.CREATE}></FormPaciente>
    );
};

