

export const Input = ({className})=> {

  return (
    <input
    type="text"
    name="numero"
    id="numero"
    autoComplete="given-name"
    className={className}
    placeholder="Número"
    onChange={handleChange}
    onBlur={handleBlur}
    value={item.numero}
    ref={nameInput}
  />
  )
}