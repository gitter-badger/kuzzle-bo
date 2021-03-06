Feature: Test authentication
  As a user
  I want to be able to login and logout.

  Scenario: Log a user in when she provides correct credentials
    Given I go to the login page
    And I authenticate
    Then I am authenticated

  Scenario: The user is logged out when she presses the logout button
    Given I go to the login page
    And I authenticate
    And I click the logout button
    Then I am logged out

  Scenario: The not authentified user is denied to visit an authenticated page
    Given I go to the logout page
    And I am on browse data page for a collection
    Then I see the login page
