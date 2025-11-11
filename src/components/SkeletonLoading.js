import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap Bundle JS
import "../scss/custom.scss"; // Custom Sass file
import "../App.css"; // Other CSS files
import Image from "../images/image.png";
import "react-loading-skeleton/dist/skeleton.css";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function SkeletonLoading({ data }) {
  return (
    <div className="app-wrapper">
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
                    <div className="p4">
                      <SkeletonTheme
                        baseColor="#d2d2d2"
                        highlightColor="#f1f1f1"
                      >
                        {data || <Skeleton count={2} height={25} width={500} />}
                        <p>&nbsp;</p>
                        <div>
                          <Row>
                            <Col>
                              <div className="form-group">
                                {data || <Skeleton count={2} height={25} />}
                                {/* Nome */}
                                <br />
                              </div>
                              <br />
                            </Col>
                            <Col>
                              <div className="form-group">
                                {data || <Skeleton count={2} height={25} />}
                                {/* Cargo */}
                                <br />
                              </div>
                              <br />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="form-group">
                                {data || <Skeleton count={2} height={25} />}{" "}
                                {/* Email DPMG */}
                                <br />
                              </div>
                              <br />
                            </Col>
                            <Col>
                              <div className="form-group">
                                {data || <Skeleton count={2} height={25} />}{" "}
                                {/* Possui Ramal? */}
                              </div>
                              <br />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="form-group">
                                {data || <Skeleton count={2} height={25} />}{" "}
                                {/* Setor */}
                              </div>
                              <br />
                            </Col>
                            <Col>
                              <div className="form-group">
                                {data || <Skeleton count={2} height={25} />}{" "}
                                {/* Ramal */}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <p>
                                {" "}
                                {data || <Skeleton height={25} width={200} />}
                              </p>{" "}
                              {/* Unidade */}
                              <br />
                              <br />
                              <br />
                              <br />
                            </Col>
                            <Col></Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="form-group">
                                {data || <Skeleton count={2} height={25} />}{" "}
                                {/* Ramal */}
                              </div>
                              <p>&nbsp;</p>
                            </Col>
                          </Row>
                        </div>
                      </SkeletonTheme>
                    </div>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                  </Col>

                  {/* Right container (1/3) */}
                  <Col md={4} className="right-col text-center">
                    {/* Placeholder for image/decorative content */}

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
}
