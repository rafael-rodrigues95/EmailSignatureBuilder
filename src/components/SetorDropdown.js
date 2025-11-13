import React, { useState, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FormControl from "react-bootstrap/FormControl";
import { useSetorData } from "../hooks/useFetchData";

export default function SetorDropdown({ formData, setFormData }) {
  const { data } = useSetorData(); // backend fetch
  const [departmentName, setDepartmentName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Handle selection
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

  // Filter dropdown items
  const filteredData = data?.filter((s) =>
    s.noSetor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Safety patch for React-Bootstrap parentNode error
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div ref={dropdownRef} onKeyDown={handleKeyDown}>
      <DropdownButton
        id="dropdown-basic-button"
        title={
          <span
            style={{
              display: "inline-block",
              maxWidth: "250px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              verticalAlign: "middle",
            }}
          >
            {departmentName || "Selecione o Setor"}
          </span>
        }
        onSelect={handleSelectDepartment}
        variant="secondary"
        renderMenuOnMount={true} // important to avoid portal focus bugs
        popperConfig={{ strategy: "fixed" }} // keeps DOM structure stable
      >
        {/* Search Box */}
        <Dropdown.ItemText as="div" style={{ padding: "0.5rem" }}>
          <FormControl
            placeholder="Buscar Setor..."
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()} // stops arrow key crash
          />
        </Dropdown.ItemText>

        <Dropdown.Divider />

        {/* Scrollable list */}
        <Dropdown.ItemText
          as="div"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((s) => (
              <Dropdown.Item key={s.coUuid} eventKey={String(s.coUuid)}>
                {s.noSetor}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>Nenhum resultado encontrado</Dropdown.Item>
          )}
        </Dropdown.ItemText>
      </DropdownButton>
    </div>
  );
}
