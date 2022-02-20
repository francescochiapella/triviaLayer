import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, fireEvent, screen } from "./util/test-utils";
import App from "./App";

const mockedData = {
  response_code: 0,
  results: [
    {
      category: "category",
      type: "multiple",
      difficulty: "difficulty",
      question: "questionToBeAsked",
      correct_answer: "correct_answer",
      incorrect_answers: ["incorrect_answers"],
    },
    {
      category: "category",
      type: "multiple",
      difficulty: "difficulty",
      question: "questionToBeAsked",
      correct_answer: "correct_answer",
      incorrect_answers: ["incorrect_answers"],
    },
  ],
};

export const handlers = [
  rest.get("https://opentdb.com/api.php", (req, res, ctx) => {
    return res(ctx.json(mockedData), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("shows loading text in the loading phase", async () => {
  render(<App />);
  expect(screen.getByTestId("loadingTriviaId")).toBeInTheDocument();
});

it("shows the initial summary info", async () => {
  render(<App />);
  expect(await screen.findByText(/Your score is:/i)).toBeInTheDocument();
  expect(await screen.findByText(/Your score is:/i)).toHaveTextContent(
    "Your score is: 0 points"
  );
  expect(await screen.findByText(/You answered:/i)).toBeInTheDocument();
  expect(await screen.findByText(/You answered:/i)).toHaveTextContent(
    "You answered: 0 question"
  );
});

it("shows the question info", async () => {
  render(<App />);
  expect(await screen.findByText(/Category:/i)).toHaveTextContent(
    "Category: category Difficulty: difficulty"
  );
  expect(await screen.findByText(/questionToBeAsked/i)).toBeInTheDocument();
});

it("shows 'You are Correct!!!' if the answer is correct", async () => {
  render(<App />);

  fireEvent.click(await screen.findByRole("radio", { name: "correct_answer" }));
  expect(await screen.findByText(/You are Correct!!!/i)).toBeInTheDocument();
});

it("shows 'You are Wrong!!!' if the answer is correct", async () => {
  render(<App />);

  fireEvent.click(
    await screen.findByRole("radio", { name: "incorrect_answers" })
  );
  expect(await screen.findByText(/You are Wrong!!!/i)).toBeInTheDocument();
});

it("disables the PREV button if first question", async () => {
  render(<App />);
  expect((await screen.findAllByRole("button"))[0]).toBeDisabled();
});

it("disables the NEXT button if no answers", async () => {
  render(<App />);
  expect((await screen.findAllByRole("button"))[1]).toBeDisabled();
});

it("enables the NEXT button if answered", async () => {
  render(<App />);
  fireEvent.click((await screen.findAllByRole("radio"))[0]);
  expect((await screen.findAllByRole("button"))[1]).toBeEnabled();
});

it("enables the PREV button if second+ question", async () => {
  render(<App />);
  fireEvent.click((await screen.findAllByRole("radio"))[0]);
  fireEvent.click((await screen.findAllByRole("button"))[1]);
  expect((await screen.findAllByRole("button"))[0]).toBeEnabled();
});

it("shows END button on last question", async () => {
  render(<App />);
  fireEvent.click((await screen.findAllByRole("radio"))[0]);
  fireEvent.click((await screen.findAllByRole("button"))[1]);
  expect((await screen.findAllByRole("button"))[1]).toHaveTextContent("END");
});
