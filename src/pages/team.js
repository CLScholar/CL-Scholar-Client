import React from 'react';
import { Container, Row, Col, Card, CardImg, CardBlock,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const Team = () => {
  return (
    <div>
      <Container>
        <h2 className="my-2 pt-4 text-center">The Team</h2>
        <Row className="my-5">
          <Col>
            <Card>
              <CardImg top width="100%" src={require('../assets/images/team/mayank.jpg')} alt="Card image cap" />
              <CardBlock>
                <CardTitle>Mayank Singh</CardTitle>
                <CardSubtitle>Research Scholar</CardSubtitle>
                <a target="_blank" rel="noopener noreferrer" href='http://mayank4490.github.io/'><Button style={{cursor: 'pointer'}}>Website</Button></a>
              </CardBlock>
            </Card>
          </Col>
          <Col>
              <Card>
                <CardImg top width="100%" src={require('../assets/images/team/pradeep.jpg')} alt="Card image cap" />
                <CardBlock>
                  <CardTitle>Pradeep Dogga</CardTitle>
                  <CardSubtitle>Undergraduate Student</CardSubtitle>
                  <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/pradeep-dogga-iit-kgp'><Button style={{cursor: 'pointer'}}>Website</Button></a>
                </CardBlock>
              </Card>
          </Col>
          <Col>
            <Card>
              <CardImg top width="100%" src={require('../assets/images/team/sohan.jpg')} alt="Card image cap" />
              <CardBlock>
                <CardTitle>Sohan Patro</CardTitle>
                <CardSubtitle>Undergraduate Student</CardSubtitle>
                <a target="_blank" rel="noopener noreferrer" href='https://github.com/Sohanpatro/'><Button style={{cursor: 'pointer'}}>Website</Button></a>
              </CardBlock>
            </Card>
          </Col>
        </Row>
        <Row className="my-5">
          <Col>
            <Card>
              <CardImg top width="100%" src={require('../assets/images/team/dhiraj.jpg')} alt="Card image cap" />
              <CardBlock>
                <CardTitle>Dhiraj Kumar</CardTitle>
                <CardSubtitle>Undergraduate Student</CardSubtitle>
                <a target="_blank" rel="noopener noreferrer" href='http://djbarnwal.github.io/'><Button style={{cursor: 'pointer'}}>Website</Button></a>
              </CardBlock>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardImg top width="100%" src={require('../assets/images/team/ritam.jpg')} alt="Card image cap" />
              <CardBlock>
                <CardTitle>Ritam Dutt</CardTitle>
                <CardSubtitle>Undergraduate Student</CardSubtitle>
                <a target="_blank" rel="noopener noreferrer" href='https://github.com/ShoRit'><Button style={{cursor: 'pointer'}}>Website</Button></a>
              </CardBlock>
            </Card>
          </Col>
          <Col xs='4'>
            <Card>
              <CardImg top width="100%" src={require('../assets/images/team/rajarshi.jpg')} alt="Card image cap" />
              <CardBlock>
                <CardTitle>Rajarshi Haldar</CardTitle>
                <CardSubtitle>Undergraduate Student</CardSubtitle>
                <a target="_blank" rel="noopener noreferrer" href='http://rajarshihaldar.com/'><Button style={{cursor: 'pointer'}}>Website</Button></a>
              </CardBlock>
            </Card>
          </Col>
        </Row>
        <Row className="my-5">
          <Col xs='4'>
            <Card>
              <CardImg top width="100%" src={require('../assets/images/team/animesh.png')} alt="Card image cap" />
              <CardBlock>
                <CardTitle>Animesh Mukherjee</CardTitle>
                <CardSubtitle>Professor, IIT KGP</CardSubtitle>
                <a target="_blank" rel="noopener noreferrer" href='http://cse.iitkgp.ac.in/~animeshm/'><Button style={{cursor: 'pointer'}}>Website</Button></a>
              </CardBlock>
            </Card>
          </Col>
          <Col xs='4'>
            <Card>
              <CardImg top width="100%" src={require('../assets/images/team/pawang.png')} alt="Card image cap" />
              <CardBlock>
                <CardTitle>Pawan Goyal</CardTitle>
                <CardSubtitle>Professor, IIT KGP</CardSubtitle>
                <a target="_blank" rel="noopener noreferrer" href='http://cse.iitkgp.ac.in/~pawang/'><Button style={{cursor: 'pointer'}}>Website</Button></a>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Team;
