import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import "./App.css";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  email: yup
    .string()
    .email("El formato es incorrecto")
    .required("El correo electrónico es requerido"),
});

interface ISubmitData {
  name: string;
  email: string;
}

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ISubmitData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: ISubmitData) => {
    console.log(data);
  };

  return (
    <>
      <h2>Compound components</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            {...register("name")}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>

        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="form-group-buttons">
          <button type="submit" className="btn btn-primary">
            Send
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-warning float-right"
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
}

export default App;
