function findAllOccurrences(tree, targetId) {
  let target_id = targetId;
  const result = [];

  function findRecursive(nodes) {
    const occurrences = [];

    for (const node of nodes) {
      if (node.id === target_id) {
        occurrences.push(node);

        const parentNodes = node.parent_id !== null ? findAllOccurrences(tree, node.parent_id) : [];
        
        occurrences.unshift(...parentNodes);

        return occurrences; // обрываем цикл
      } 
    }

    return occurrences;
  }


  for (const key in tree) {
    const found = findRecursive(tree[key]);

    if (found.length > 0) {
      result.push(...found);
    }
  }

  return result;
}

const tree = {
  rows: [
    { id: 0, parent_id: null }, // 1
    { id: 3, parent_id: 2 }, // 4
    { id: 6, parent_id: 1 },
    { id: 11, parent_id: 10 }
  ],
  cols: [
    { id: 1, parent_id: 0 }, // 2
    { id: 2, parent_id: 0 }, // 3
    { id: 4, parent_id: 3 }, // 5
    { id: 7, parent_id: 6 }, // 5
    { id: 8, parent_id: 6 }, // 5
    { id: 9, parent_id: 6 }, // 5
    { id: 10, parent_id: 6 }, // 5
    { id: 12, parent_id: 11 }, // 5
  ],
  elements: [
    { id: 5, parent_id: 4 }, // 6
    { id: 13, parent_id: 12 } // 6
  ]
};

const targetId = 12;
const occurrences = findAllOccurrences(tree, targetId);

console.log(occurrences);

// Результаты:
[
  { id: 0, parent_id: null },
  { id: 2, parent_id: 0 },
  { id: 3, parent_id: 2 },
  { id: 4, parent_id: 3 },
  { id: 5, parent_id: 4 } 
]

[
  { id: 0, parent_id: null },
  { id: 1, parent_id: 0 },
  { id: 6, parent_id: 1 },
  { id: 10, parent_id: 6 },
  { id: 11, parent_id: 10 },
  { id: 12, parent_id: 11 }
]