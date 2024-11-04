import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap Bundle JS
import "./scss/custom.scss"; // Custom Sass file
import "./App.css"; // Other CSS files
import React, { useState, useRef, useEffect } from "react";

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
  const [hasTelephone, setHasTelephone] = useState(1, 2);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRamal = (val) => {
    val === 2
      ? setFormData({ ...formData, phone: "não possui" })
      : setFormData({ ...formData, phone: "" });

    setHasTelephone(val);
  };

  useEffect(() => {
    validateForm();
  }, [formData, address, unitName, hasTelephone]);

  const handleGenerate = () => {
    const html = generateHTML(formData);
    setHtmlCode(html);
    setSigGenerated(true);
  };

  const validateForm = () => {
    let errors = {};

    // Validate name field
    if (!formData.name || !formData.jobTitle || !formData.selectedDivision) {
      errors.name = "Dados não preenchidos.";
    }

    if (hasTelephone === 1 && !formData.phone) {
      errors.name = "Telefone não preenchido.";
    }

    // Validate name field
    if (!unitName) {
      errors.name = "Dados não preenchidos.";
    }

    // Validate cargo field
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

  // const handleHasNotTelephone = () => {
  //   setHasTelephone("")
  // }

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
    fontSize: "5vh",
  };

  const imageStyle = {};

  const divTitleStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(50, 158, 134)",
    color: "white",
  };

  return (
    <div>
      <div style={divTitleStyle}>
        <Container>
          <Row>
            <Col>
              <p>&nbsp;</p>
              <p className="mt-5 mb-5">
                Gerador de Assinatura para <br />
                <span style={titleStyle}>Email da DPMG</span>
              </p>
              <p>&nbsp;</p>
            </Col>
            <Col>
              <p>&nbsp;</p>
            </Col>
            <Col xs={2}>
              <p>&nbsp;</p>
              <img
                src="https://gerais.defensoria.mg.def.br/sistemas/scsdp/img/logo.png"
                className="imageStyle"
                alt="logo da Defensoria"
                height="150vw"
              ></img>
            </Col>
          </Row>
        </Container>
      </div>

      <p>&nbsp;</p>
      <Container>
        <div className="card  px-5">
          <form>
            <Row>
              <Col>
                <p>&nbsp;</p>
                <p>
                  Preencha todos os campos abaixo para criar uma assinatura HTML
                  <br />
                  para seu email institucional.
                </p>
                <p>&nbsp;</p>
              </Col>
            </Row>
            <Row>
              <Col>
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
              </Col>
              <Col>
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
              </Col>
              <Col>
                <div className="form-group">
                  <label>Possui Ramal?</label>
                  <br />
                  <ToggleButtonGroup
                    type="radio"
                    name="toggle"
                    value={hasTelephone}
                    onChange={handleRamal}
                  >
                    <ToggleButton id="tbg-btn-1" value={1} variant="secondary">
                      Sim
                    </ToggleButton>
                    <ToggleButton id="tbg-btn-2" value={2} variant="secondary">
                      Não
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
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
                <div
                  className="form-group"
                  style={{
                    opacity: hasTelephone === 1 ? 1 : 0,
                    transition: "all .4s",
                    visibility: hasTelephone === 1 ? "visible" : "hidden",
                  }}
                >
                  <label>Ramal:</label>
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

                <p>&nbsp;</p>
              </Col>

              <Col>
              <p></p>
                <Button
                  style={{ opacity: isFormValid ? 1 : 0.5 }}
                  disabled={!isFormValid}
                  type="button"
                  variant="primary"
                  onClick={handleGenerate}
                >
                  Gerar assinatura HTML
                </Button>
                <p></p>
              </Col>
            </Row>
          </form>
        </div>
      </Container>
      <p>&nbsp;</p>
      <Container>
        <div
          className="card px-5"
          style={{
            opacity: sigGenerated ? 1 : 0,
            transition: "all .5s",
            visibility: sigGenerated ? "visible" : "hidden",
          }}
        >
          <h3 className="mt-3" style={titleStyle}>
            &nbsp;
          </h3>
          <div>
            {/* <pre>{htmlCode}</pre> */}
            <div ref={divRef} dangerouslySetInnerHTML={{ __html: htmlCode }} />
            <p>&nbsp;</p>
            <Button variant="primary" onClick={handleSelectText}>
              Copiar para a Área de transferência
            </Button>
            <p>&nbsp;</p>
          </div>
        </div>
      </Container>
      <p>&nbsp;</p>
      <Container>
        <Row>
          <Col>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in
              neque volutpat, euismod nunc eu, posuere ante. Nullam tincidunt
              commodo laoreet. Curabitur eu orci id risus suscipit faucibus. Sed
              mollis faucibus ligula, vitae semper urna ornare id. Praesent id
              elit vitae mauris suscipit vulputate. Phasellus efficitur eros at
              tellus volutpat, sed facilisis nisl lacinia. Integer sed nisi quis
              velit pharetra pretium sed vel nisl. Ut gravida, magna non
              bibendum dignissim, odio orci molestie eros, quis posuere massa
              velit ac neque. Sed vitae felis a ante lobortis suscipit at
              lacinia sem. Etiam et lectus a augue eleifend consectetur. Mauris
              tellus nibh, molestie vel lacus eu, consectetur scelerisque
              libero. Phasellus consectetur fermentum faucibus. Phasellus
              pretium nisi semper fringilla mollis. In commodo quam quis diam
              suscipit hendrerit. Vestibulum et quam et ex aliquet ultricies.
              Quisque tellus leo, consectetur in elit sit amet, facilisis
              maximus dui. Curabitur lobortis mi nec pharetra ultricies. Proin
              congue diam nec libero eleifend ultrices. Praesent augue dui,
              finibus at sapien eget, tempus condimentum purus.
            </p>
          </Col>
          <Col>
            <p>
              Vivamus nibh eros, scelerisque eget nulla a, eleifend volutpat
              erat. Sed tempor eleifend nunc, molestie sodales diam condimentum
              id. Nam id felis non orci sagittis aliquet. Pellentesque egestas
              non est eu scelerisque. Integer sed facilisis tellus, aliquam
              porta nisl. Sed accumsan justo at blandit vestibulum. Praesent
              iaculis pellentesque eros. Pellentesque feugiat justo mauris, non
              dictum odio viverra eu. Aliquam suscipit fringilla gravida.
              Vestibulum commodo nulla est, eget finibus ipsum malesuada
              venenatis. Cras luctus tellus eget nibh consequat sollicitudin. In
              ultricies dui at libero tincidunt accumsan. Aenean quis dictum
              magna. Curabitur lorem ex, efficitur at arcu eu, malesuada
              ultrices elit. Sed sit amet velit dolor.
            </p>
          </Col>
        </Row>
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
                        Ramal: <a href="tel:${data.phone}"
                        style="text-decoration: none; color: rgb(30, 30, 30); font-size: 0.8vw; margin-right: 10px;">
                        ${data.phone}
                        </a> 
                        / Geral: <a href="tel:03125228676"
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
