import React, { useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormControl from "react-bootstrap/FormControl";
import { useSetorData } from "../hooks/useFetchData";

export default function SetorDropdown({ formData, setFormData }) {
  const { data } = useSetorData();
  const [departmentName, setDepartmentName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);


  const handleSelectDepartment = (eventKey) => {
    const selected = data.find((s) => String(s.coUuid) === eventKey);
    if (selected) {
      setDepartmentName(selected.noSetor);
      setFormData({
        ...formData,
        selectedDepartment: selected.noSetor,
      });
      console.log(formData);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const filteredData = data?.filter((s) =>
    s.noSetor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={dropdownRef} onKeyDown={handleKeyDown}>
      <DropdownButton
        id="department-dropdown"
        title={
          departmentName
            ? departmentName.length > 40
              ? departmentName.substring(0, 40) + "..."
              : departmentName
            : "Selecione o Setor"
        }
        onSelect={handleSelectDepartment}
        variant="secondary"
      >
        {/* Search Box */}
        <div style={{ padding: "0.5rem" }}>
          <FormControl
            placeholder="Buscar Setor..."
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Dropdown.Divider />
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((s) => (
              <Dropdown.Item key={s.coUuid} eventKey={String(s.coUuid)}>
                {s.noSetor}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>Nenhum resultado encontrado</Dropdown.Item>
          )}
        </div>
      </DropdownButton>
    </div>
  );
}
