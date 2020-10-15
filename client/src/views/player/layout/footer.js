import React from 'react';
import {
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row
} from 'reactstrap';

class Footer extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © 2020{" "}
                  <a
                    className="font-weight-bold ml-1"
					href="https://qm.qq.com/cgi-bin/qm/qr?k=N_vtpYtJG4x6JFE-QLB8L6JrcONQioAV&jump_from=webapi"
					target="_blank"
					rel="noopener noreferrer"
				  >
					加入官方QQ群：568769552
                  </a>
                </div>
              </Col>
              <Col xl="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>
                    <NavLink
                      href="https://bbs.mountblade.com.cn/forum-106-1.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github"/>{" "}
                      骑砍中文站永恒讨论板块
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://bbs.mountblade.com.cn/forum-120-1.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github"/>{" "}
                      永恒投诉区
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}
export default Footer;