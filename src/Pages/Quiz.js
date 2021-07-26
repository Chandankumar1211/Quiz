import React, { memo, useEffect, useState } from "react";
import { Container, Row, Col, Button } from 'reactstrap';
import Header from './../Component/Header';
import Question from "../Component/Question";

const Quiz = () => {
    const [quizFIrst, setQuizFirst] = useState(false);
    const [quizSecond, setQuizSecond] = useState(false);

    const resetClick = (section) => {
        if (section == 1) {
            setQuizFirst(false);
        } else {
            setQuizSecond(false);
        }
    }

    return (<>
        <Header title="Quiz-Section" />
        <Container>
            <Row>
                <Col xs={12} sm={12} md={12} lg={6} className={quizFIrst && "border-1"} >
                    {!quizFIrst &&
                        <Row>
                            <Col xs={12} sm={6} md={6} lg={6}>
                                <Button onClick={() => setQuizFirst(!quizFIrst)} > Start Quiz</Button>
                            </Col>
                        </Row>
                    }
                    {quizFIrst &&
                        <Question section={1} resetClick={resetClick} />
                    }
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className={quizSecond && "border-1"}>
                    {!quizSecond &&
                        <Row>
                            <Col xs={12} sm={6} md={6} lg={6}>
                                <Button onClick={() => setQuizSecond(!quizSecond)} > Start Quiz</Button>
                            </Col>
                        </Row>
                    }
                    {quizSecond &&
                        <Question section={2} resetClick={resetClick} />
                    }
                </Col>
            </Row>
        </Container>
    </>
    )
}


export default memo(Quiz)