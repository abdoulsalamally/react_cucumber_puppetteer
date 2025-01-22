Feature: Connexion utilisateur

  Scenario: Connexion réussie
    Given l'utilisateur est sur la page de connexion
    When l'utilisateur entre des identifiants valides
    Then l'utilisateur devrait voir le tableau de bord

  Scenario: Connexion échouée avec des identifiants invalides
    Given l'utilisateur est sur la page de connexion
    When l'utilisateur entre des identifiants invalides
    Then l'utilisateur devrait voir un message d'erreur indiquant une connexion invalide
    And l'utilisateur devrait rester sur la page de connexion
