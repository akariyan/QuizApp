import React, { ChangeEvent, useMemo, useState } from "react";
import { QuizData } from "../rest/types/apiType";
import { styled } from "../stitches.config";
import InputGroup, { InputGroupProps } from "./ui/InputGroup";

const StyledQuizItem = styled("div", {
  display: "grid",
  gridColumnStart: "1",
  gridColumnEnd: "3",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr 0.5fr 1fr",
  gridTemplateAreas: `
  "question"
  "tag"
  "awnserlist"
  `,
  fontSize: "1.5em",
  ".question": {
    gridArea: "question",
    paddingTop: "2vh",
    lineHeight: "2em",
  },
  ".tag": {
    gridArea: "tag",
    span: {
      backgroundColor: "$greenCyan",
      borderRadius: "2.5vh",
      display: "inline-block",
      height: "5vh",
      margin: "2vw 2vh",
      padding: "0.5em 1em",
      paddingTop: "0.5em",
      textAlign: "center",
      fontSize: "0.7em",
      color: "$white",
    },
    ".category": {},
  },
  ".awnserlist": {
    gridArea: "awnserlist",
    display: "flex",
    flexDirection: "column",
    ".answer": {
      marginBottom: "1.5vh",
    },
    input: {
      width: "2em",
    },
    label: {
      position: "relative",
      top: "-10px",
      left: "5px",
    },
  },
});

interface QuizItemProps {
  quiz: QuizData;
  index: number;
  onSelectChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function QuizItem({
  quiz,
  index,
  onSelectChange,
}: QuizItemProps) {
  console.log(quiz);
  const isChecked = (idx: number) =>
    quiz.userSelectedIndex === idx ? `checked="false"` : null;

  const newAnswerList = quiz.answerList.map((answer, idx) => {
    return (
      <div className="answer" key={idx}>
        <InputGroup.Radio
          type="radio"
          name="answer"
          id={answer}
          value={answer}
          onChange={onSelectChange}
          disabled={quiz.isCorrect !== undefined}
          checked={quiz.userSelectedIndex === idx}
        />
        <label htmlFor={answer} dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    );
  });

  return (
    <StyledQuizItem>
      <div
        className="question"
        dangerouslySetInnerHTML={{ __html: `Q${index + 1} : ${quiz.question}` }}
      />
      <div className="tag">
        <span className="difficulty">{quiz.difficulty}</span>
        <span className="category">{quiz.category}</span>
      </div>
      <div className="awnserlist">{newAnswerList}</div>
    </StyledQuizItem>
  );
}
