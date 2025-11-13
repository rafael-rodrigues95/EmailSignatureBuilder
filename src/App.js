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
import "./scss/custom.scss"; // Custom Sass file
import "./App.css"; // Other CSS files
import { useUnidadeData } from "./hooks/useFetchData";
import { useSetorData } from "./hooks/useFetchData";
import InputMask from "react-input-mask";
import React, { useState, useRef, useEffect } from "react";
import UnidadeDropdown from "./components/UnidadeDropdown";
import SetorDropdown from "./components/SetorDropdown";
import SkeletonLoading from "./components/SkeletonLoading";
import Image from "./images/image.png";

const SignatureGenerator = () => {
  // API

  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    email: "",
    phone: "",
    selectedUnit: "",
    selectedDepartment: "",
    selectedLogradouro: "",
    selectedNumero: "",
    selectedBairro: "",
    selectedCidade: "",
    selectedUf: "",
  });
  const [address, setAddress] = useState("");
  const [htmlCode, setHtmlCode] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [sigGenerated, setSigGenerated] = useState(false);
  const [hasTelephone, setHasTelephone] = useState(1);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useUnidadeData();

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

  const handleGenerate = () => {
    const html = generateHTML(formData);
    setHtmlCode(html);
    setSigGenerated(true);
  };

  const validateForm = () => {
    let errors = {};

    const formValues = Object.values(formData);

    const anyFieldIsEmpty = formValues.some((value) => {
      // We trim strings to treat "   " (whitespace only) as empty
      return typeof value === "string" ? value.trim() === "" : !value;
    });

    if (anyFieldIsEmpty) {
      // You can set a generic error message here
      errors.general =
        "Formulário inválido - todos os campos devem ser preenchidos.";
    }

    // Validate name field
    if (!formData.name || !formData.jobTitle) {
      errors.name = "Dados não preenchidos.";
    }

    if (hasTelephone === 1 && !formData.phone) {
      errors.phone = "Telefone não preenchido.";
    }

    // Validate cargo field
    // if (!address) {
    //   errors.address = "Dados não preenchidos.";
    // }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [formData, address, hasTelephone]);

  const divRef = useRef(null);

  if (isLoading) return <SkeletonLoading data={data} />;
  if (error) return <p>Error: {error.message}</p>;

  const handleSelectDepartment = (eventKey) => {
    setAddress(eventKey);
    let selectedDepartment = "";
    switch (eventKey) {
      case "STI":
        selectedDepartment =
          "Superintendência de Tecnologia da Informação - STI";
        break;
      case "SGPSO":
        selectedDepartment =
          "Superintendência de Gestão de Pessoas e Saúde Ocupacional - SGPSO";
        break;
      case "Corregedoria":
        selectedDepartment = "Corregedoria Geral";
        break;
      case "Defensoria":
        selectedDepartment =
          "DOS DIREITOS DAS CRIANÇAS E DOS ADOLESCENTES (CÍVEL E ATO INFRACIONAL), EXECUÇÕES PENAIS E TRIBUNAL DO JÚRI (SUMÁRIO E PLENÁRIO)";
        break;
      default:
        selectedDepartment = "vazio";
    }
    setFormData({ ...formData, selectedDepartment });
  };

  // switch (eventKey) {
  //   case "DPMG Sede I":
  //     selectedUnit = "Rua da sede I, nº 2731 / 5º Andar - Lourdes - BH";
  //     break;
  //   case "DPMG Sede II":
  //     selectedUnit =
  //       "Rua Bernardo Guimarães, nº 2731 / 5º Andar - Lourdes - BH";
  //     break;
  //   case "DPMG Sede III":
  //     selectedUnit = "Rua da sede 3, nº 2731 / 5º Andar - Lourdes - BH";
  //     break;
  //   case "DPMG Sede IV":
  //     selectedUnit = "Rua da sede 4, nº 2731 / 5º Andar - Lourdes - BH";
  //     break;
  //   default:
  //     selectedUnit = "vazio";

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

  return (
    <div className={`app-wrapper ${!isLoading ? "visible" : ""}`}>
      <div className="divTitleStyle">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={10} md={9} lg={8}>
              <div className="p-4">
                <Row>
                  {/* Left container (2/3) */}
                  <Col md={8}>
                    <p className="text-center text-white py-3 titulo-form">
                      Gerador de Email Institucional da DPMG
                    </p>
                  </Col>
                  <Col md={4}></Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <main className="body-section">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={10} md={9} lg={8}>
              <div className="p-4">
                <Row>
                  {/* Left container (2/3) */}
                  <Col md={8} className="main-card shadow-lg left-col p-4">
                    <p className="p4">
                      Preencha todos os campos abaixo para criar uma assinatura
                      HTML
                      <br />
                      para seu email institucional.
                    </p>
                    <p>&nbsp;</p>

                    <div>
                      <form>
                        <Row>
                          <Col>
                            <div className="form-group">
                              <label>Nome:</label>
                              <br />
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
                              <label>Cargo:</label>
                              <br />
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
                        </Row>
                        <Row>
                          <Col>
                            <div className="form-group">
                              <label>Email DPMG:</label>
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
                              <label>Possui Ramal?</label>
                              <br />
                              <ToggleButtonGroup
                                type="radio"
                                name="toggle"
                                value={hasTelephone}
                                onChange={handleRamal}
                              >
                                <ToggleButton
                                  id="tbg-btn-1"
                                  value={1}
                                  variant="secondary"
                                >
                                  Sim
                                </ToggleButton>
                                <ToggleButton
                                  id="tbg-btn-2"
                                  value={2}
                                  variant="secondary"
                                >
                                  Não
                                </ToggleButton>
                              </ToggleButtonGroup>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <div className="form-group">
                              <label>Setor:</label>
                              <SetorDropdown
                                formData={formData}
                                setFormData={setFormData}
                              />
                              {/* <DropdownButton
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
                                <Dropdown.Item eventKey="Defensoria">Defensoria</Dropdown.Item>
                              </DropdownButton> */}
                            </div>
                            <br />
                          </Col>

                          <Col>
                            <div
                              className="form-group"
                              style={{
                                opacity: hasTelephone === 1 ? 1 : 0,
                                transition: "all .4s",
                                visibility:
                                  hasTelephone === 1 ? "visible" : "hidden",
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
                              <label>Unidade:</label>
                                <UnidadeDropdown
                                  formData={formData}
                                  setFormData={setFormData}
                                />
                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                          </Col>
                          <Col></Col>
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
                        <h3 className="mt-3 titleStyle">&nbsp;</h3>
                        <div>
                          <div
                            ref={divRef}
                            dangerouslySetInnerHTML={{ __html: htmlCode }}
                          />
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nam in neque volutpat, euismod nunc eu,
                            posuere ante. Nullam tincidunt commodo laoreet.
                            Curabitur eu orci id risus suscipit faucibus. Sed
                            mollis faucibus ligula, vitae semper urna ornare id.
                            Praesent id elit vitae mauris suscipit vulputate.
                            Phasellus efficitur eros at tellus volutpat, sed
                            facilisis nisl lacinia. Integer sed nisi quis velit
                            pharetra pretium sed vel nisl. Ut gravida, magna non
                            bibendum dignissim, odio orci molestie eros, quis
                            posuere massa velit ac neque. Sed vitae felis a ante
                            lobortis suscipit at lacinia sem. Etiam et lectus a
                            augue eleifend consectetur. Mauris tellus nibh,
                            molestie vel lacus eu, consectetur scelerisque
                            libero. Phasellus consectetur fermentum faucibus.
                            Phasellus pretium nisi semper fringilla mollis. In
                            commodo quam quis diam suscipit hendrerit.
                            Vestibulum et quam et ex aliquet ultricies. Quisque
                            tellus leo, consectetur in elit sit amet, facilisis
                            maximus dui. Curabitur lobortis mi nec pharetra
                            ultricies. Proin congue diam nec libero eleifend
                            ultrices. Praesent augue dui, finibus at sapien
                            eget, tempus condimentum purus.
                          </p>
                        </Col>
                        <Col>
                          <p>
                            Vivamus nibh eros, scelerisque eget nulla a,
                            eleifend volutpat erat. Sed tempor eleifend nunc,
                            molestie sodales diam condimentum id. Nam id felis
                            non orci sagittis aliquet. Pellentesque egestas non
                            est eu scelerisque. Integer sed facilisis tellus,
                            aliquam porta nisl. Sed accumsan justo at blandit
                            vestibulum. Praesent iaculis pellentesque eros.
                            Pellentesque feugiat justo mauris, non dictum odio
                            viverra eu. Aliquam suscipit fringilla gravida.
                            Vestibulum commodo nulla est, eget finibus ipsum
                            malesuada venenatis. Cras luctus tellus eget nibh
                            consequat sollicitudin. In ultricies dui at libero
                            tincidunt accumsan. Aenean quis dictum magna.
                            Curabitur lorem ex, efficitur at arcu eu, malesuada
                            ultrices elit. Sed sit amet velit dolor.
                          </p>
                        </Col>
                      </Row>
                    </Container>
                  </Col>

                  {/* Right container (1/3) */}
                  <Col md={4} className="right-col text-center">
                    <div className="decorative-box">
                      <img className="corner-image" src={Image} alt="---"></img>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
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
        style="vertical-align: -webkit-baseline-middle; font-size: 0.8vw; font-family: Aptos, Arial, sans-serif;">
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
                      <td style="border-left: 3px solid rgb(65, 99, 70);  padding-left: 0.8vw;">
                      <p style="margin: 0px !important"><em>${data.name.toUpperCase()}</em><br/>
                        ${data.jobTitle}<br/>
                        ${data.selectedDepartment}<br/>
                        <!--Defensoria Pública do Estado de Minas Gerais<br/>-->
                        ${data.selectedUnit}<br />
                        ${data.selectedLogradouro}, ${data.selectedNumero} - ${data.selectedBairro} - ${data.selectedCidade}/${data.selectedUf}<br/>
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
