import React, { useState, useRef, useEffect, StyleSheet } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";

const SignatureGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    phone: "",
    selectedUnit: "",
    selectedDivision: "",
  });
  const [address, setAdress] = useState("");
  const [unitName, setUnitName] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [sigGenerated, setSigGenerated] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    validateForm();
  }, [formData, address, unitName]);

  const handleGenerate = () => {
    const html = generateHTML(formData);
    setHtmlCode(html);
    setSigGenerated(true);
  };

  const validateForm = () => {
    let errors = {};

    // Validate name field
    if (
      !formData.name ||
      !formData.jobTitle ||
      !formData.phone ||
      !formData.phone ||
      !formData.selectedDivision
    ) {
      errors.name = "Dados não preenchidos.";
    }

    // Validate name field
    if (!unitName) {
      errors.name = "Dados não preenchidos.";
    }

    // Validate name field
    if (!address) {
      errors.name = "Dados não preenchidos.";
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSelectDivision = (eventKey) => {
    setAdress(eventKey);
    let selectedDivision = "";
    switch (eventKey) {
      case "STI":
        selectedDivision = "Superintendência de Tecnologia da Informação - STI";
        break;
      case "SGPSO":
        selectedDivision =
          "Superintendência de Gestão de Pessoas e Saúde Ocupacional - SGPSO";
        break;
      case "Corregedoria":
        selectedDivision = "Corregedoria Geral";
        break;
      default:
        selectedDivision = "vazio";
    }
    setFormData({ ...formData, selectedDivision });
  };

  const handleSelectUnit = (eventKey) => {
    setUnitName(eventKey);
    let selectedUnit = "";
    switch (eventKey) {
      case "DPMG Sede I":
        selectedUnit =
          "Rua Bernardo Guimarães, nº 2731 / 5º Andar - Lourdes - BH";
        break;
      case "DPMG Sede II":
        selectedUnit = "Rua da sede 2, nº 2731 / 5º Andar - Lourdes - BH";
        break;
      case "DPMG Sede III":
        selectedUnit = "Rua da sede 3, nº 2731 / 5º Andar - Lourdes - BH";
        break;
      case "DPMG Sede IV":
        selectedUnit = "Rua da sede 4, nº 2731 / 5º Andar - Lourdes - BH";
        break;
      default:
        selectedUnit = "vazio";
    }
    setFormData({ ...formData, selectedUnit });
  };

  const divRef = useRef(null);

  const handleSelectText = async () => {
    if (isFormValid) {
      const range = document.createRange();
      range.selectNodeContents(divRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        const htmlContent = divRef.current.innerHTML;
        const blob = new Blob([htmlContent], { type: "text/html" });
        const clipboardItem = new ClipboardItem({ "text/html": blob });
        await navigator.clipboard.write([clipboardItem]);
        console.log("Text copied to clipboard");
        console.log();
      } catch (err) {
        console.error("Failed to copy text");
      }
      console.log("Form submitted successfully!");
    } else {
      // Form is invalid, display error messages
      console.log("Existe erro no formulario.");
    }
  };

  const titleStyle = {
    color: "#198754",
  };

  const divTitleStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div>
      <p>&nbsp;</p>
      <div style={divTitleStyle}>
        <h3 className="mt-5" style={titleStyle}>
          <i>Gerador de assinatura para Email</i>
        </h3>
        <p>&nbsp;</p>
      </div>
      <Container>
        <div className="card  px-5">
          <form>
            <Row>
              <Col>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <div className="form-group">
                  <label>Seu nome para a assinatura:</label>
                  <br />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                </div>
                <br />

                <div className="form-group">
                  <label>Setor:</label>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={address || "Selecione o Setor"}
                    onSelect={handleSelectDivision}
                    variant="secondary"
                  >
                    <Dropdown.Item eventKey="STI">STI</Dropdown.Item>
                    <Dropdown.Item eventKey="SGPSO">SGPSO</Dropdown.Item>
                    <Dropdown.Item eventKey="Corregedoria">
                      Corregedoria
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                <br />
              </Col>
              <Col>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <div className="form-group">
                  <label>Seu cargo:</label>
                  <br />
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Job Title"
                  />
                </div>
                <br />

                <div className="form-group">
                  <label>Unidade:</label>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={unitName || "Selecione a Unidade"}
                    onSelect={handleSelectUnit}
                    variant="secondary"
                  >
                    <Dropdown.Item eventKey="DPMG Sede I">
                      DPMG Sede I
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="DPMG Sede II">
                      DPMG Sede II
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="DPMG Sede III">
                      DPMG Sede III
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="DPMG Sede IV">
                      DPMG Sede IV
                    </Dropdown.Item>
                  </DropdownButton>
                </div>

                <br />
              </Col>
              <Col>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <div className="form-group">
                  <label>Telefone:</label>
                  <br />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                  />
                </div>
                <br />
                <br />
                <button
                  style={{ opacity: isFormValid ? 1 : 0.5 }}
                  disabled={!isFormValid}
                  type="button"
                  className="btn btn-success"
                  onClick={handleGenerate}
                >
                  Gerar assinatura HTML
                </button>

                <p>&nbsp;</p>
              </Col>
            </Row>
          </form>
        </div>
      </Container>
      <p>&nbsp;</p>
      <Container>
        <div className="card px-5" style={{ opacity: sigGenerated ? 1 : 0 }}>
        <h3 className="mt-5" style={titleStyle}>
          &nbsp;
        </h3>
          <div>
            {/* <pre>{htmlCode}</pre> */}
            <div ref={divRef} dangerouslySetInnerHTML={{ __html: htmlCode }} />
            <p>&nbsp;</p>
            <button className="btn btn-success" onClick={handleSelectText}>
              Copiar para a Área de transferência
            </button>
            <p>&nbsp;</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

const generateHTML = (data) => {
  return `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
      xmlns="http://www.w3.org/TR/REC-html40">
      <head></head>
      </head>

      <body>
      <table cellpadding="0" cellspacing="0"
        style="vertical-align: -webkit-baseline-middle; font-size: 1.5vw; font-family: Aptos, Arial, sans-serif;">
        <tbody>
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0"
                style="vertical-align: -webkit-baseline-middle; font-size: 0.8vw; font-family: Aptos, Arial, sans-serif; border-collapse: collapse;">
                  <tbody>
                    <tr>
                      <td width="100">
                      <a href="https://defensoria.mg.def.br/sistemas/scsdp/"
                        style="text-decoration: none;">
                          <img style="position: static; top: 0px;" height="90"
                            src="https://gerais.defensoria.mg.def.br/sistemas/scsdp/img/logo.png" />
                      </a>
                      </td>
                      <td style="border-left: 3px solid rgb(65, 99, 70);  padding-left: 0.5vw;">
                      <p><i>${data.name}</i><br/>
                        ${data.jobTitle}<br/>
                        ${data.selectedDivision}<br/>
                        Defensoria Pública do Estado de Minas Gerais<br/>
                        ${data.selectedUnit}<br/>
                        Tel. <a href="tel:${data.phone}"
                        style="text-decoration: none; color: rgb(30, 30, 30); font-size: 0.8vw; margin-right: 10px;">
                        ${data.phone}
                        </a> 
                        / Geral <a href="tel:03125228676"
                        style="text-decoration: none; color: rgb(30, 30, 30); font-size: 0.8vw; margin-right: 10px;">
                        (31) 2522-8676
                        </a>
                      </p>
                      </td>
                    </tr>
                  </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
    </html>
  `;
};

export default SignatureGenerator;
