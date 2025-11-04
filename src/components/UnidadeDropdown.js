import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormControl from "react-bootstrap/FormControl";
import { useUnidadeData } from "../hooks/useUnidadeData"; // adjust path if needed

export default function UnidadeDropdown({ formData, setFormData }) {
  const { data } = useUnidadeData(); // your backend fetch
  const [unitName, setUnitName] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectUnit = (eventKey) => {
    const selected = data.find((u) => String(u.coUuid) === eventKey);
    if (selected) {
      setUnitName(selected.noUnidade);
      setLogradouro(selected.logradouro);
      setNumero(selected.numero);
      setBairro(selected.bairro);
      setCidade(selected.cidade);
      setUf(selected.uf);
      setFormData({ ...formData, 
        selectedUnit: selected.noUnidade,
        selectedLogradouro: selected.logradouro,
        selectedNumero: selected.numero,
        selectedBairro: selected.bairro,
        selectedCidade: selected.cidade,
        selectedUf: selected.uf });
    }
  };

  // Filter results based on search term
  const filteredData = data?.filter((u) =>
    u.noUnidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <DropdownButton
        id="dropdown-basic-button"
        title={unitName || "Selecione a Unidade"}
        onSelect={handleSelectUnit}
        variant="secondary"
      >
        {/* Search Box */}
        <div style={{ padding: "0.5rem" }}>
          <FormControl
            placeholder="Buscar unidade..."
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dropdown.Divider />

        {/* List of filtered items */}
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((u) => (
              <Dropdown.Item key={u.coUuid} eventKey={String(u.coUuid)}>
                {u.noUnidade}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>Nenhum resultado encontrado</Dropdown.Item>
          )}
        </div>
      </DropdownButton>
    </>
  );
}
