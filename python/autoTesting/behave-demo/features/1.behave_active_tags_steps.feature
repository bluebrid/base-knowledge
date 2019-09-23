Feature: 1.behave_active_tags_steps
    Scenario: Scenario name
    Given I setup the current values for active tags with:
        | category | value |
        | foo      | xxx   |
    Then the following active tag combinations are enabled:
        | tags                        | enabled? |
        | @active.with_foo=xxx        | yes      |
        | @active.with_foo=other      | no       | 