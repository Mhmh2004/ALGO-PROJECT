class HeapSorter {
    static heapSort(array) {
        let size = array.length;


        for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
            HeapSorter.heapify(array, size, i);
        }


        for (let i = size - 1; i > 0; i--) {
            HeapSorter.swap(array, 0, i);
            size--;
            HeapSorter.heapify(array, size, 0);
        }
    }

    static heapify(array, size, parentIndex) {
        let largest = parentIndex;
        let leftChild = 2 * parentIndex + 1;
        let rightChild = 2 * parentIndex + 2;


        if (leftChild < size && array[leftChild] > array[largest]) {
            largest = leftChild;
        }


        if (rightChild < size && array[rightChild] > array[largest]) {
            largest = rightChild;
        }


        if (largest !== parentIndex) {
            HeapSorter.swap(array, parentIndex, largest);

            HeapSorter.heapify(array, size, largest);
        }
    }

    static swap(array, firstIndex, secondIndex) {
        let temp = array[firstIndex];
        array[firstIndex] = array[secondIndex];
        array[secondIndex] = temp;
    }
}


const array = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10000));
HeapSorter.heapSort(array);
console.log("Sorted array:", array);
