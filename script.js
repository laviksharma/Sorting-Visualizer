let array = [];
let speed = 500;
let originalColor = "#3498db";
let compareColor = "#e74c3c";
let swapColor = "#27ae60";
let sortedColor = "#2ecc71"; // Green color for the correct position
let sorting = false;
let stopSortingFlag = false;

function generateArray() {
    const defaultBarCount = 10;
    const barCountInput = document.getElementById("barCount");
    const barCount = barCountInput.value || defaultBarCount;
    barCountInput.value = barCount;
    array = [];

    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = "";

    for (let i = 0; i < barCount; i++) {
        const height = Math.floor(Math.random() * 80) + 10;
        array.push(height);
        const bar = createBar(height, i);
        arrayContainer.appendChild(bar);
    }
}

function createBar(height, index) {
    const bar = document.createElement("div");
    const barHeight = height * 5;

    bar.style.height = `${barHeight}px`;
    bar.className = "array-bar";
    bar.style.backgroundColor = originalColor;

    const number = document.createElement("span");
    number.textContent = height;
    number.className = "array-bar-number";

    bar.appendChild(number);
    bar.setAttribute("data-index", index);

    return bar;
}

function updateArraySize() {
    if (!sorting && !stopSortingFlag) {
        generateArray();
    }
}

function bubbleSort() {
    if (!sorting) {
        sorting = true;
        stopSortingFlag = false;

        let n = array.length;

        function runSortStep(i) {
            if (sorting && !stopSortingFlag && i < n - 1) {
                highlightBars(i, compareColor);

                setTimeout(() => {
                    if (array[i] > array[i + 1]) {
                        swapElements(i, i + 1);

                        highlightBars(i, swapColor);
                        highlightBars(i + 1, swapColor);
                    }

                    restoreOriginalColor(i);
                    restoreOriginalColor(i + 1);

                    runSortStep(i + 1);
                }, speed);
            } else if (sorting && !stopSortingFlag && i === n - 1) {
                n--;

                // Highlight the correct position in green
                highlightBars(n, sortedColor);

                setTimeout(() => {
                    restoreOriginalColor(n);
                    if (n > 0) {
                        runSortStep(0);
                    } else {
                        sorting = false;
                        stopSortingFlag = false; // Reset the stop flag when sorting is complete
                    }
                }, speed);
            } else {
                sorting = false;
                stopSortingFlag = false; // Reset the stop flag if sorting is stopped
            }
        }

        runSortStep(0);
    }
}

function stopSorting() {
    stopSortingFlag = true;
}

function updateBarHeight(index) {
    const bars = document.querySelectorAll('.array-bar');
    const barHeight = array[index] * 5;
    bars[index].style.height = `${barHeight}px`;
    bars[index].querySelector('.array-bar-number').textContent = array[index];
}

function highlightBars(index, color) {
    const bars = document.querySelectorAll('.array-bar');
    bars[index].style.backgroundColor = color;
}

function swapElements(index1, index2) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;

    updateBarHeight(index1);
    updateBarHeight(index2);
}

function restoreOriginalColor(index) {
    const bars = document.querySelectorAll('.array-bar');
    bars[index].style.backgroundColor = originalColor;
}

// Initial array generation
generateArray();
