import React from 'react';
import { Container, Row, Col, Card, CardImg, CardText, CardBlock,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const Team = () => {
  return (
    <div>
      <Container>
        <h2 className="my-2 pt-4 text-center">The Team</h2>
        <Row className="my-5">
          <Col>
            <Card>
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBlock>
                <CardTitle>Ritam Dutt</CardTitle>
                <CardSubtitle>Sentiment Analysis</CardSubtitle>
                <CardText>A short description of the work done for this project by the above person</CardText>
                <Button>Website</Button>
              </CardBlock>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBlock>
                <CardTitle>Dhiraj Kumar</CardTitle>
                <CardSubtitle>Online System</CardSubtitle>
                <CardText>A short description of the work done for this project by the above person</CardText>
                <Button>Website</Button>
              </CardBlock>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBlock>
                <CardTitle>Dhiraj Kumar</CardTitle>
                <CardSubtitle>Online System</CardSubtitle>
                <CardText>A short description of the work done for this project by the above person</CardText>
                <Button>Website</Button>
              </CardBlock>
            </Card>
          </Col>
        </Row>
        <Row className="my-5">
          <Col>
            <Card>
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBlock>
                <CardTitle>Dhiraj Kumar</CardTitle>
                <CardSubtitle>Online System</CardSubtitle>
                <CardText>A short description of the work done for this project by the above person</CardText>
                <Button>Website</Button>
              </CardBlock>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBlock>
                <CardTitle>Dhiraj Kumar</CardTitle>
                <CardSubtitle>Online System</CardSubtitle>
                <CardText>A short description of the work done for this project by the above person</CardText>
                <Button>Website</Button>
              </CardBlock>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
              <CardBlock>
                <CardTitle>Dhiraj Kumar</CardTitle>
                <CardSubtitle>Online System</CardSubtitle>
                <CardText>A short description of the work done for this project by the above person</CardText>
                <Button>Website</Button>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Team;
