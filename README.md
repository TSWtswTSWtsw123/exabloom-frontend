# React Flow Workflow Builder

This project is a technical test to implement a workflow builder using React and the React Flow library. It features a dynamic workflow canvas where users can add, connect, and manage different types of nodes based on a set of requirements.

---

## ✅ Implemented Features

### Level 1: Basic Workflow Structure

- A simple workflow is initialized with a **Start Node** and an **End Node**.
- The nodes are connected by a custom edge that features a `+` button to add new nodes.

*Suggested Image: A screenshot of the initial Start and End nodes connected by the edge with the `+` button.*
`[Your Image of the Initial Workflow Here]`

### Level 2: Action Nodes

- Clicking the `+` button on an edge opens a selection menu.
- Choosing **Action Node** from the menu inserts a new node into the workflow at that position.
- The new node is automatically connected to its surrounding nodes.
- Clicking on an Action Node opens a **Settings Panel** on the right.
- The Settings Panel allows the node's name to be changed or the node to be deleted.

*Suggested Image: A screenshot showing a workflow with a few Action Nodes and the Settings Panel open for one of them.*
`[Your Image of an Action Node and the Settings Panel Here]`

### Level 3: If / Else Node

- Choosing **If / Else Node** from the selection menu inserts a complex conditional node.
- By default, the If/Else node is created with one "Branch" and one "Else" path.
- The **Settings Panel** for this node allows:
  - Changing the node's main label.
  - Editing the names of existing branches.
  - Adding new branches to the node.
- The branch labels are rendered as part of the node and are not clickable themselves; editing is done only through the Settings Panel.
- The entire If/Else node and its branches can be deleted.

*Suggested Image: A screenshot of a complex workflow featuring an If/Else node with multiple branches and its corresponding Settings Panel.*
`[Your Image of an If/Else Node and its Advanced Settings Panel Here]`

---

## 🚀 Setup

To set up the project dependencies, navigate to the project directory and run:

```bash
npm install
```

## 🏃 Running the Application

To start the development server and run the application, use the following command:

```bash
npm start
```

This will open the application in your default web browser, typically at `http://localhost:3000`.
