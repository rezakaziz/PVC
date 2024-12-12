
# Travelling Salesman Problem (TSP) Heuristic Implementation

## Description

This project implements a heuristic solution for the **Travelling Salesman Problem (TSP)**. The goal is to compute an approximate solution efficiently using **JavaScript**. The implementation includes interactive graph generation, visualization, and computation of TSP solutions using both an exact method and a heuristic approach.

---

## Features

- **Graph Creation**:  
  Users can dynamically input graph nodes (cities) and distances (edges).
- **Exact TSP Solution**:  
  Implements an exact algorithm to compute the minimal route and its cost.
- **Heuristic TSP Solution**:  
  Implements a heuristic algorithm to approximate the TSP solution efficiently.
- **Interactive Visualization**:  
  Uses `vis.js` for real-time graph visualization.

---

## Technologies Used

- **JavaScript**: Core programming language.
- **vis.js**: For graph visualization in a browser.
- **HTML/CSS**: Front-end interface.

---

## How to Use

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rezakaziz/PVC
   cd PVC
   ```

2. **Open the HTML file** in a browser to access the interactive interface.

3. **Input graph data**:
   - Enter city names (nodes) separated by commas.
   - Enter distances (edges) between nodes in the required format.

4. **Run the algorithms**:
   - Click to generate the graph.
   - Execute the **Exact Solution** or the **Heuristic Solution** for the TSP.

5. **View Results**:
   - The resulting graph is displayed with the TSP route.
   - Execution time and total cost are displayed.

