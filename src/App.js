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
  FormControl,
} from "react-bootstrap"; // React Bootstrap components
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap Bundle JS
import "./scss/custom.scss"; // Custom Sass file
import "./App.css"; // Other CSS files
import InputMask from "react-input-mask";
import React, { useState, useRef, useEffect } from "react";

const SignatureGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    email: "",
    linkedin: "",
    phone: "",
    selectedUnit: "",
    selectedDivision: "",
  });
  const [address, setAddress] = useState("");
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
      errors.phone = "Telefone não preenchido.";
    }

    // Validate name field
    if (!unitName) {
      errors.unitName = "Dados não preenchidos.";
    }

    // Validate cargo field
    if (!address) {
      errors.address = "Dados não preenchidos.";
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSelectDivision = (eventKey) => {
    setAddress(eventKey);
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
        selectedUnit = "Rua da sede I, nº 2731 / 5º Andar - Lourdes - BH";
        break;
      case "DPMG Sede II":
        selectedUnit =
          "Rua Bernardo Guimarães, nº 2731 / 5º Andar - Lourdes - BH";
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

  // const handleHasNoTelephone = () => {
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
        console.log("Text copied to clipboard");
        await navigator.clipboard.write([clipboardItem]);
        console.log();
      } catch (err) {
        console.error("Failed to copy text");
      }
      console.log("Form submitted successfully!");
    } else {
      // Form is invalid, display error messages
      console.log("There is one or more error in the form.");
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
        <div className="card  px-5" Style="border-color: white !important">
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
                  {/* <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                  /> */}
                  <FormControl
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <br />
              </Col>
              <Col>
                <div className="form-group">
                  <label>Seu cargo:</label>
                  <br />
                  {/*<input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Job Title"
                  /> */}
                  <FormControl
                    type="text"
                    placeholder="Job Title"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
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
            </Row>

            <Row>
              <Col>
                <div className="form-group">
                  <label>Seu email DPMG</label>
                  <br />
                  <FormControl
                    type="text"
                    placeholder="email@dpmg.mg.def.br"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <br />
              </Col>
              <Col>
                <div className="form-group">
                  <label>Perfil no LikedIn (opcional):</label>
                  <br />
                  <FormControl
                    type="text"
                    placeholder="LinkedIn profile"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                  />
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
                  <FormControl
                    type="text"
                    as={InputMask}
                    mask="(99) 9999-9999"
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </Col>
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
                <br />

                <p>&nbsp;</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  style={{ opacity: isFormValid ? 1 : 0.5 }}
                  disabled={!isFormValid}
                  type="button"
                  variant="primary"
                  onClick={handleGenerate}
                >
                  Gerar assinatura HTML
                </Button>
                <p>&nbsp;</p>
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
                        <!--Defensoria Pública do Estado de Minas Gerais<br/>-->
                        ${data.selectedUnit}<br/>
                        Ramal: <a href="tel:${data.phone}"
                        style="text-decoration: none; color: rgb(30, 30, 30); font-size: 0.8vw; margin-right: 10px;">
                        ${data.phone}
                        </a> 
                        / Geral: <a href="tel:03125228676"
                        style="text-decoration: none; color: rgb(30, 30, 30); font-size: 0.8vw; margin-right: 10px;">
                        (31) 2522-8676
                        </a><br/>
                        <a target="blank" href="mailto:${data.email}" style="text-decoration: none;">
                          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" style="margin-top: 0.5em;" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_72_24)">
                          <rect width="25" height="25" rx="2" fill="#24645B"/>
                          <path d="M2 19H22V12L12 16.1791L2 12V19Z" fill="white"/>
                          <path d="M2 7H22V11.1446L12 15L2 11.1446V7Z" fill="white"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_72_24">
                          <rect width="25" height="25" fill="white"/>
                          </clipPath>
                          </defs>
                          </svg>


                          
                        </a>&nbsp;
                        <a target="blank" href="sip:${data.email}" style="text-decoration: none;">
                          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" style="margin-top: 0.5em;" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_72_26)">
                          <rect width="25" height="25" rx="2" fill="#24645B"/>
                          <path d="M13.3021 3.47917C12.8635 3.47943 12.4321 3.59062 12.048 3.80239C11.6639 4.01416 11.3396 4.31964 11.1052 4.6904C10.8709 5.06116 10.7342 5.48516 10.7077 5.92297C10.6812 6.36077 10.7659 6.79816 10.9539 7.19444H4.01388C3.19281 7.19444 2.52777 7.85948 2.52777 8.68055V16.1111C2.52777 16.9322 3.19281 17.5972 4.01388 17.5972H11.4444C12.2655 17.5972 12.9305 16.9322 12.9305 16.1111V8.68055C12.9305 8.67109 12.9278 8.66241 12.9276 8.65298C13.0516 8.67118 13.1768 8.6804 13.3021 8.68055C13.6436 8.68055 13.9818 8.61329 14.2973 8.48259C14.6128 8.35189 14.8995 8.16033 15.141 7.91883C15.3825 7.67733 15.5741 7.39063 15.7048 7.0751C15.8355 6.75957 15.9028 6.42139 15.9028 6.07986C15.9028 5.73833 15.8355 5.40015 15.7048 5.08462C15.5741 4.76909 15.3825 4.48239 15.141 4.24089C14.8995 3.9994 14.6128 3.80783 14.2973 3.67713C13.9818 3.54643 13.6436 3.47917 13.3021 3.47917ZM18.875 4.96528C18.3823 4.96528 17.9098 5.16099 17.5614 5.50937C17.2131 5.85774 17.0174 6.33024 17.0174 6.82292C17.0174 7.31559 17.2131 7.78809 17.5614 8.13646C17.9098 8.48484 18.3823 8.68055 18.875 8.68055C19.3677 8.68055 19.8402 8.48484 20.1885 8.13646C20.5369 7.78809 20.7326 7.31559 20.7326 6.82292C20.7326 6.33024 20.5369 5.85774 20.1885 5.50937C19.8402 5.16099 19.3677 4.96528 18.875 4.96528ZM5.49999 9.42361H7.35763H8.10069H9.95833V10.1667H8.10069V15.3681H7.35763V10.1667H5.49999V9.42361ZM14.4167 10.1667V16.1111C14.4167 17.7533 13.0866 19.0833 11.4444 19.0833H9.22978C10.0917 20.4208 11.593 21.3125 13.3021 21.3125C15.9696 21.3125 18.1319 19.1502 18.1319 16.4826V11.6528C18.1319 10.8354 17.4632 10.1667 16.6458 10.1667H14.4167ZM19.2175 10.1667C19.4701 10.6051 19.618 11.1103 19.618 11.6528V16.4826C19.618 17.1142 19.5293 17.7231 19.351 18.2953C20.7702 18.0724 21.8472 16.8467 21.8472 15.3681V11.6528C21.8472 10.8354 21.1785 10.1667 20.3611 10.1667H19.2175Z" fill="white"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_72_26">
                          <rect width="25" height="25" fill="white"/>
                          </clipPath>
                          </defs>
                          </svg>


                          
                        </a>&nbsp;
                        <a target="blank" href="https://www.linkedin.com/profile/${data.linkedin}" style="text-decoration: none;">
                          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" style="margin-top: 0.5em;" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_71_9)">
                          <rect width="25" height="25" rx="2" fill="#24645B"/>
                          <path d="M20 3.33333H4.99998C4.07915 3.33333 3.33331 4.07917 3.33331 5V20C3.33331 20.9208 4.07915 21.6667 4.99998 21.6667H20C20.9208 21.6667 21.6666 20.9208 21.6666 20V5C21.6666 4.07917 20.9208 3.33333 20 3.33333ZM9.12831 18.3333H6.66998V10.4233H9.12831V18.3333ZM7.87415 9.2925C7.08165 9.2925 6.44081 8.65 6.44081 7.85917C6.44081 7.06833 7.08248 6.42667 7.87415 6.42667C8.66415 6.42667 9.30665 7.06917 9.30665 7.85917C9.30665 8.65 8.66415 9.2925 7.87415 9.2925ZM18.3366 18.3333H15.88V14.4867C15.88 13.5692 15.8633 12.3892 14.6025 12.3892C13.3233 12.3892 13.1266 13.3883 13.1266 14.42V18.3333H10.67V10.4233H13.0283V11.5042H13.0616C13.39 10.8825 14.1916 10.2267 15.3875 10.2267C17.8766 10.2267 18.3366 11.865 18.3366 13.995V18.3333Z" fill="white"/>
                          </g>
                          <defs>
                          <clipPath id="clip0_71_9">
                          <rect width="25" height="25" fill="white"/>
                          </clipPath>
                          </defs>
                          </svg>


                          
                        </a>&nbsp;
                      </p>
                      </td>
                      <td>

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
