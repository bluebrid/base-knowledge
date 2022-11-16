function reportableClassDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      reportingURL = "http://www...";
    };
  }
   
  @reportableClassDecorator
  class BugReport {
    type = "report";
    title: string;
   
    constructor(t: string) {
      this.title = t;
    }
  }
   
  const bug = new BugReport("Needs dark mode");
  console.log(bug.title); // Prints "Needs dark mode"
  console.log(bug.type); // Prints "report"
  console.log(bug)
  // Note that the decorator _does not_ change the TypeScript type
  // and so the new property `reportingURL` is not known
  // to the type system:
  // bug.reportingURL;