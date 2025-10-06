# React Flow Workflow Builder

This project is a technical test to implement a workflow builder using React and the React Flow library. It features a dynamic workflow canvas where users can add, connect, and manage different types of nodes based on a set of requirements.

---

## ✅ Implemented Features

### Level 1: Basic Workflow Structure

- A simple workflow is initialized with a **Start Node** and an **End Node**.
- The nodes are connected by a custom edge that features a `+` button to add new nodes.

![image-20251006164823185](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20251006164823185.png)

### Level 2: Action Nodes

- Clicking the `+` button on an edge opens a selection menu.
- Choosing **Action Node** from the menu inserts a new node into the workflow at that position.
- The new node is automatically connected to its surrounding nodes.
- Clicking on an Action Node opens a **Settings Panel** on the right.
- The Settings Panel allows the node's name to be changed or the node to be deleted.

![image-20251006164901007](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20251006164901007.png)

### Level 3: If / Else Node

- Choosing **If / Else Node** from the selection menu inserts a complex conditional node.
- By default, the If/Else node is created with one "Branch" and one "Else" path.
- The **Settings Panel** for this node allows:
  - Changing the node's main label.
  - Editing the names of existing branches.
  - Adding new branches to the node.
- The branch labels are rendered as part of the node and are not clickable themselves; editing is done only through the Settings Panel.
- The entire If/Else node and its branches can be deleted.

![image-20251006165409794](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20251006165409794.png)

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
