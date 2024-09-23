let array = [];
let searchValue = 0;
let low = 0;
let high = 0;
let intervalId;
let startTime; // For tracking start time
let endTime; // For tracking end time

function startBinarySearch() {
  // Clear previous results
  document.getElementById("searchResult").textContent = "";
  document.getElementById("timer").textContent = ""; // Clear previous timer display
  document.getElementById("timeComplexity").textContent = "";
  document.getElementById("spaceComplexity").textContent = "";
  clearInterval(intervalId); // Clear any ongoing animation

  // Get array and search value input
  array = document.getElementById("arrayInput").value.split(",").map(Number);
  searchValue = parseInt(document.getElementById("searchValue").value);

  if (isNaN(searchValue) || array.length === 0) {
    alert("Please provide a valid sorted array and search value");
    return;
  }

  // Sort the array to ensure binary search works properly
  array.sort((a, b) => a - b);

  // Build the table
  buildTable();

  // Highlight the entire array initially
  highlightArray(0, array.length - 1, "highlight-all");

  // Initialize low and high for binary search
  low = 0;
  high = array.length - 1;

  // Start the timer when the search begins
  startTime = Date.now();

  // Start binary search animation
  intervalId = setInterval(animateBinarySearch, 1000); // 1-second delay for each iteration

  // Calculate and show time complexity
  showComplexity();
}

function buildTable() {
  const table = document.getElementById("arrayTable");
  table.innerHTML = ""; // Clear previous table

  // Create a single row for the array elements
  const row = table.insertRow();

  array.forEach((value, index) => {
    const cell = row.insertCell();
    cell.textContent = value;
    cell.setAttribute("id", `cell-${index}`);
  });
}

function highlightArray(start, end, className) {
  for (let i = start; i <= end; i++) {
    const cell = document.getElementById(`cell-${i}`);
    cell.classList.add(className);
  }
}

function clearHighlights() {
  array.forEach((_, index) => {
    const cell = document.getElementById(`cell-${index}`);
    cell.classList.remove(
      "highlight-all",
      "highlight-right",
      "highlight-left",
      "highlight",
      "blink"
    );
  });
}

function animateBinarySearch() {
  if (low <= high) {
    clearHighlights(); // Clear previous highlights

    const mid = Math.floor((low + high) / 2);

    // Highlight the mid element
    highlightArray(0, array.length - 1, "highlight-all"); // Highlight entire array initially
    const midCell = document.getElementById(`cell-${mid}`);
    midCell.classList.add("highlight");

    if (array[mid] === searchValue) {
      // If the search value is found, blink the mid element
      midCell.classList.add("found", "blink");
      document.getElementById(
        "searchResult"
      ).textContent = `Value ${searchValue} found at index ${mid}!`;

      // Stop the search and the timer after the value is found
      endTime = Date.now();
      displayElapsedTime();

      clearInterval(intervalId);
      return;
    } else if (array[mid] < searchValue) {
      // Highlight the right half and search there
      highlightArray(mid + 1, high, "highlight-right");
      low = mid + 1;
    } else {
      // Highlight the left half and search there
      highlightArray(low, mid - 1, "highlight-left");
      high = mid - 1;
    }
  } else {
    document.getElementById(
      "searchResult"
    ).textContent = `Value ${searchValue} not found in the array.`;

    // Stop the timer if the value is not found
    endTime = Date.now();
    displayElapsedTime();

    clearInterval(intervalId); // Stop the search
  }
}

function displayElapsedTime() {
  const elapsedTime = (endTime - startTime) / 1000; // Convert milliseconds to seconds
  document.getElementById(
    "timer"
  ).textContent = `Elapsed Time: ${elapsedTime} seconds`;
}

function showComplexity() {
  const n = array.length;
  const timeComplexity = `Time Complexity: O(log n)`;
  const spaceComplexity = `Space Complexity: O(1) - No extra space required.`;

  document.getElementById("timeComplexity").textContent = timeComplexity;
  document.getElementById("spaceComplexity").textContent = spaceComplexity;
}
