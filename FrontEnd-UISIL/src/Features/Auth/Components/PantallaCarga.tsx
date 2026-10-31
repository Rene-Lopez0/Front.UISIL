import "./PantallaCarga.css";
export function PantallaCarga() {
  return (
    <div
      className="pantalla-carga position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center gap-5 text-white"
      role="status"
    >
      <div className="loader" aria-hidden="true">
        <div className="loader-square" />
        <div className="loader-square" />
        <div className="loader-square" />
        <div className="loader-square" />
        <div className="loader-square" />
        <div className="loader-square" />
        <div className="loader-square" />
      </div>
      <p className="m-0">Verificando credenciales…</p>
    </div>
  );
}
