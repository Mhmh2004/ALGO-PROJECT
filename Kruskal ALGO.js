class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.edges = [];
    }

    addEdge(source, destination, weight) {
        this.edges.push([weight, source, destination]);
    }

    find(parent, i) {
        if (parent[i] === i) {
            return i;
        }
        return this.find(parent, parent[i]);
    }

    union(parent, rank, x, y) {
        const rootX = this.find(parent, x);
        const rootY = this.find(parent, y);


        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
    }

    kruskalMST() {

        this.edges.sort((a, b) => a[0] - b[0]);

        const parent = [];
        const rank = [];
        const mst = [];


        for (let i = 0; i < this.vertices; i++) {
            parent[i] = i;
            rank[i] = 0;
        }


        for (const [weight, source, destination] of this.edges) {
            const rootSource = this.find(parent, source);
            const rootDestination = this.find(parent, destination);


            if (rootSource !== rootDestination) {
                mst.push([source, destination, weight]);
                this.union(parent, rank, rootSource, rootDestination);
            }
        }

        return mst;
    }
}


function main() {
    const graph = new Graph(4);

    graph.addEdge(0, 1, 9);
    graph.addEdge(0, 2, 6);
    graph.addEdge(0, 3, 5);
    graph.addEdge(1, 3, 15);
    graph.addEdge(2, 3, 4);

    const mst = graph.kruskalMST();
    console.log("Edges in the MST:");
    mst.forEach(([source, destination, weight]) => {
        console.log(`${source} -- ${destination} == ${weight}`);
    });
}

main();
