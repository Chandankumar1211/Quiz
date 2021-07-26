import React, { memo, useEffect, useState } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';

const randomNumber = () => {
    return Math.floor(Math.random() * 10) + 1
}

const getQuestion = (key) => {
    let obj = {};
    switch (key) {
        case 0:
            obj = {
                sign: "+",
                text: 'Sum',
                firstNumber: randomNumber(),
                secondNumber: randomNumber(),
                method: function (a, b) { return a + b; }
            }
            break;
        case 1:
            obj = {
                sign: "-",
                text: 'Subtraction',
                firstNumber: randomNumber(),
                secondNumber: randomNumber(),
                method: function (a, b) { return a - b; }
            }
            break;
        case 2:
            obj = {
                sign: "*",
                text: 'Multiplication',
                firstNumber: randomNumber(),
                secondNumber: randomNumber(),
                method: function (a, b) { return a * b; }
            }
            break;
        case 3:
            obj = {
                sign: "/",
                text: 'Division',
                firstNumber: randomNumber(),
                secondNumber: randomNumber(),
                method: function (a, b) { return a / b; }
            }
            break;
    }
    return obj;
}

const Question = ({ section, resetClick }) => {
    const [inputValue, setInputValue] = useState('');
    const [count, setCount] = useState(1);
    const [score, setScore] = useState(0);
    const [questionList, setQuestionList] = useState([]);
    const [isQuizStart, setIsQuizStart] = useState(false);
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalueId] = useState(null);
    const [question, setQuestion] = useState({});
    let { sign, text, firstNumber, secondNumber } = question;
    const handleChange = (e) => {
        let { value } = e.target;
        setInputValue(value);
    }
    useEffect(() => {
        if (count < 21) {
            let newOperator = Math.floor(Math.random() * 4);
            setQuestion(getQuestion(newOperator));
            var secs = 0;
            var interValId = setInterval(function () {
                secs++;
                setTimer(secs);
                if (secs > 20) {
                    clearInterval(interValId);
                }
            }, 1000);
            setIntervalueId(interValId)
        }
    }, [isQuizStart])

    useEffect(() => {
        if (timer == 20) {
            onNextClick();
        }
    }, [timer])

    const onNextClick = () => {
        clearInterval(intervalId);
        let correctAnswer = question && Number(question.method(firstNumber, secondNumber))
        correctAnswer = correctAnswer % 1 === 0 ? correctAnswer : Number(correctAnswer).toFixed(2);
        let previousQues = [...questionList, { qustion: `Find the ${text} of given numbers. ${firstNumber} ${sign} ${secondNumber}`, answer: inputValue, correctAnswer: correctAnswer }]
        setQuestionList(previousQues)
        let newOperator = Math.floor(Math.random() * 4);
        setQuestion(getQuestion(newOperator));
        setInputValue('');
        if (Number(inputValue).toFixed(2) == correctAnswer) {
            setScore(score + 1);
        }
        if (count < 20) {
            setCount(count + 1);
            setIsQuizStart(!isQuizStart)
        }
    }
    const onResetClick = () => {
        clearInterval(intervalId);
        setQuestionList([]);
        setScore(0);
        setTimer(0);
        setCount(0);
        setIsQuizStart(!isQuizStart)
        resetClick(section);
    }
    return (<div key={section}>
        <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
                <div>Timer: <span className="ft-wt-500">{timer}</span></div>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
                <div className="text-right">Question: <span className="ft-wt-500">{count}/20</span></div>
            </Col>
        </Row>
        <Row className="ques-cont">
            {questionList.length != 20 && <>
                <Col xs={12} sm={12} md={12} lg={12} >
                    <span className="ft-wt-500"> Question:</span> Find the {text} of given numbers. {firstNumber} {sign} {secondNumber}
                </Col>
                <Col xs={12} sm={9} md={6} lg={6} className="d-flex pd-1">
                    <span className="ft-wt-500">Answer: </span>
                    <Input type="number" onChange={handleChange} placeholder="Enter your answer" className="ml-2" value={inputValue} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} className="pd-1" >
                    <Button className="float-rt" disabled={!inputValue} onClick={onNextClick}>{score ? score : ''} Next</Button>
                    <Button onClick={onResetClick}>Reset</Button>
                </Col>
            </>}
            {questionList.length == 20 && <>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <Button onClick={onResetClick}>Reset</Button>
                </Col>
                <div>Score: <span className="ft-wt-500">{score}</span></div>
                {
                    questionList.map((e, index) => {
                        console.log(e.answer, e.correctAnswer)
                        return (
                            <Col xs={12} sm={12} md={12} lg={12} className="pd-1" key={index}>
                                <div className={"mb-2 " + (Number(e.answer) != Number(e.correctAnswer) ? 'red-text' : '')}> Question {index + 1}: {e.qustion}</div>
                                <div className="mb-2"> Answer: {e.answer} </div>
                                <div>Correct Answer: {e.correctAnswer}</div>
                            </Col>
                        )
                    })
                }
            </>
            }
        </Row>
    </div>
    )
}

export default memo(Question)
