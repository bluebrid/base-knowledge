Feature: 2.behave_context_steps
    Scenario: Show that Context parameter
      Given I set the context parameter "person" to "Alice"
      Then the behave context should have a parameter named "person"
      And  the behave context should contain:
        | Parameter | Value   |
        | person    | "Alice" |