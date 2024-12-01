# React User Management App

Cette application React permet de gérer une liste d'utilisateurs fictifs. Elle comprend des fonctionnalités d'affichage, de filtrage, d'ajout et de suppression d'utilisateurs, ainsi que d'un système de validation des formulaires avec TypeScript lors de l'ajout.

## Fonctionnalités

1. **Affichage des utilisateurs** :
   - Les utilisateurs sont affichés dans un tableau avec les informations suivantes : `id`, `name`, `email`, `age`, et `isActive`.
   - Une liste dynamique de 20 utilisateurs est générée à partir d'une API (https://randomuser.me/).

2. **Filtres et recherches** :
   - Un champ de recherche permet de filtrer les utilisateurs par `nom` ou `email`.
   - Un bouton permet d'afficher uniquement les utilisateurs actifs.

3. **Ajout et suppression d'utilisateurs** :
   - Un formulaire permet d'ajouter un utilisateur, avec des validations en TypeScript :
     - `Email` valide.
     - `Âge` entre 18 et 100.
   - Un bouton de suppression permet de retirer un utilisateur de la liste.

5. **Tests** :
   - Des tests unitaires sont implémentés avec Jest pour vérifier la fonctionnalité du formulaire d'ajout et suppression d'utilisateur, y compris la validation des champs.

## Technologies utilisées

- **ReactJS** avec **TypeScript** pour une application typée et bien structurée.
- **Jest** pour les tests unitaires et de composants.
- **React-Bootstrap** pour les composants d'interface utilisateur (formulaires, boutons, modals).

## Installation

1. Clonez le dépôt GitHub :
   ```bash
   git clone https://github.com/BenjaminAmoryGit/Test-technique-Sismic.git
   cd my-app-sismic
   
2. Installez les dépendances :
    ```bash
    npm install
    # ou avec yarn
    yarn install

3. Lancez l'application :
    ```bash
    npm start
    # ou avec yarn
    yarn start

4. Exécuter les tests :
    ```bash
    npm test
    # ou avec yarn
    yarn test
