# WorkSphere – Virtual Workspace

WorkSphere – Virtual Workspace est une application web interactive permettant de gérer facilement le personnel d'une entreprise et de les assigner à différentes salles (Réception, Salle de conférence, Serveurs, Sécurité, Archives, etc.).

L’objectif principal est de faciliter l’organisation et la répartition des employés sur un plan d’étage en temps réel, tout en intégrant les contraintes liées aux rôles et aux zones autorisées.

---

## 🚀 Fonctionnalités principales

### 🟢 Gestion des employés
- Ajouter un nouvel employé via un formulaire dynamique complet (nom, rôle, email, numéro, photo, expériences…).
- Affichage automatique dans la liste *Unassigned Staff*.
- Vérification des données via des expressions régulières (regex).

### 🟢 Assignation aux salles
- Affecter un employé à une salle spécifique.
- Retirer un employé d’une salle et le renvoyer dans *Unassigned Staff*.

### 🟢 Affichage des détails
- Cliquer sur un employé pour afficher une fiche complète :
  - Informations personnelles  
  - Photo  
  - Expériences professionnelles  

### 🟢 Gestion des expériences professionnelles
- Ajouter autant d’expériences que nécessaire.
- Suppression d’une expérience.
- la validation des date debut < à date fin

### 🟢 Sauvegarde locale
- Toutes les données (employés + salles) sont enregistrées dans `localStorage`.
- Persistance des données même après rechargement de la page.

---

## 📌 User Stories (Principales)

### 1. Ajouter un employé  
En tant qu’administrateur, je veux pouvoir ajouter un nouvel employé via un formulaire complet, afin de gérer efficacement le personnel.

### 2. Voir les employés non assignés  
En tant qu’administrateur, je veux afficher la liste des employés non assignés afin de pouvoir les répartir.

### 3. Assigner un employé à une salle  
En tant qu’administrateur, je veux assigner un employé à une salle spécifique.

### 4. Supprimer un employé  
En tant qu’administrateur, je veux supprimer un employé du système.

### 6. Enregistrer automatiquement  
En tant que système, je dois sauvegarder les données dans le LocalStorage.

---

## 🛠️ Technologies utilisées

- **HTML5**
- **CSS3 / TailwindCSS**
- **JavaScript (ES6+)**
- **ToastifyJS** (notifications)
- **LocalStorage**
  
