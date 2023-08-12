import '../css/options.css'

export const OptionsUsers = () => {
  return (
    <div className="options_box">
      <div className="ingreso_box">
        <h1>Ingreso:</h1>
        <h3>Concepto:</h3>
        <textarea name="" id="" cols="55" rows="2"></textarea>
        <h3>Total:</h3>
        <input type="number" />
        <br />
        <button>enviar</button>
      </div>
      <div className="egreso_box">
      <h1>Egreso:</h1>
        <h3>Concepto:</h3>
        <textarea name="" id="" cols="55" rows="2"></textarea>
        <h3>Total:</h3>
        <input type="number" />
        <br />
        <button>Enviar</button>
      </div>
    </div>
  )
}
