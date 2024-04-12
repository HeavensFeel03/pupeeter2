Feature: Tickets booking

    Scenario: User book a ticket
    Given User is on the "https://qamid.tmweb.ru/client/index.php" page
    When User chooses convenient time
    When User books seat
    Then User can see text "Вы выбрали билеты:"


    Scenario: User book a 2 tickets
    Given User is on the "https://qamid.tmweb.ru/client/index.php" page
    When User chooses convenient time
    When User books 2 seats
    Then User can see text "Вы выбрали билеты:"

   

    Scenario: User tries to book a taken seat
    Given User is on the "https://qamid.tmweb.ru/client/index.php" page
    When User chooses convenient time
    When User books taken seat
    Then Button "Забронировать" is disabled