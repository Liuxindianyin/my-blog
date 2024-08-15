// Helper function to pause execution for visualization purposes
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Generates a random array of given length and range
function generateRandomArray(length, min, max) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1) + min));
}

// Swap function to exchange elements in the array and update the bar heights
async function swap(array, i, j, bars) {
    [array[i], array[j]] = [array[j], array[i]];
    bars[i].style.height = `${array[i]}px`;
    bars[j].style.height = `${array[j]}px`;
    await sleep(50); // Pause for visualization
}

// Implementation of Bubble Sort
async function bubbleSort(array, bars) {
    let n = array.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await swap(array, j, j + 1, bars);
                bars[j].style.backgroundColor = '#6200ea'; // Updating color for visualization
                bars[j + 1].style.backgroundColor = '#03dac5'; // Updating color for visualization
                await sleep(50); // Wait for better visualization
            }
        }
        bars[n - i - 1].style.backgroundColor = '#4caf50'; // Coloring sorted elements
    }
}

// Helper function for Quick Sort to partition the array
async function partition(array, start, end, bars) {
    const pivotValue = array[end];
    let pivotIndex = start;
    bars[end].style.backgroundColor = '#ff5722'; // Highlight pivot
    for (let i = start; i < end; i++) {
        if (array[i] < pivotValue) {
            await swap(array, i, pivotIndex, bars);
            pivotIndex++;
        }
        bars[i].style.backgroundColor = '#03dac5'; // Reset color after processing
        await sleep(50); // Pause for visualization
    }
    await swap(array, pivotIndex, end, bars);
    bars[pivotIndex].style.backgroundColor = '#4caf50'; // Color sorted pivot
    return pivotIndex;
}

// Implementation of Quick Sort
async function quickSort(array, start, end, bars) {
    if (start >= end) return;
    let index = await partition(array, start, end, bars);
    await quickSort(array, start, index - 1, bars);
    await quickSort(array, index + 1, end, bars);
}

// Main function to start the visualization based on user input or randomly generated data
async function startVisualization() {
    const container = document.getElementById('visualization-container');
    container.innerHTML = ''; // Clear previous content

    let array = document.getElementById('arrayInput').value
        ? document.getElementById('arrayInput').value.split(',').map(num => parseInt(num.trim()))
        : generateRandomArray(50, 1, 100); // Generate a random array if no input

    const bars = array.map(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value}px`; // Adjust size for visibility
        bar.style.width = '10px'; // Adjust width to fit more bars
        bar.classList.add('bar');
        container.appendChild(bar);
        return bar;
    });

    const algorithm = document.getElementById('algorithmSelector').value;
    switch (algorithm) {
        case 'bubbleSort':
            await bubbleSort(array, bars);
            break;
        case 'quickSort':
            await quickSort(array, 0, array.length - 1, bars);
            break;
        case 'mergeSort':
            // Implementation for merge sort would be similar
            break;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('randomizeBtn').addEventListener('click', () => {
        document.getElementById('arrayInput').value = generateRandomArray(50, 1, 100).join(', ');
        startVisualization(); // Automatically start visualization with new random array
    });
});
