import expect from "expect";
import execSteps from "./execSteps";

export default (history, done) => {
  const steps = [
    location => {
      expect(location).toMatchObject({
        pathname: "/"
      });

      history.replace("/home", { the: "state" });
    },
    (location, action) => {
      expect(action).toBe("REPLACE");
      expect(location).toMatchObject({
        pathname: "/home",
        state: undefined
      });

      // We should see a warning message.
      expect(warningMessage).toMatch(
        "Hash history cannot replace state; it is ignored"
      );
    }
  ];

  let consoleError = console.error; // eslint-disable-line no-console
  let warningMessage;

  // eslint-disable-next-line no-console
  console.error = message => {
    warningMessage = message;
  };

  execSteps(steps, history, (...args) => {
    console.error = consoleError; // eslint-disable-line no-console
    done(...args);
  });
};
