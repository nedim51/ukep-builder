interface TreeNode {
    id: number;
    parent_id: number | null;
  }
  type NestedObject = {
    [key: string]: TreeNode[];
  };
  function findAllOccurrences(tree: NestedObject, targetId: number): TreeNode[] {
    const result: TreeNode[] = [];
    function findRecursive(nodes: TreeNode[], parentId: number | null = null): TreeNode[] {
      const occurrences: TreeNode[] = [];
      for (const node of nodes) {
        if (node.id === targetId) {
          occurrences.push(node);
          const parentNodes = parentId !== null ? findRecursive(tree[parentId.toString()] || [], node.parent_id) : [];
          occurrences.unshift(...parentNodes);
          return occurrences;
        } else {
          const childNodes = tree[node.id.toString()] || [];
          const foundInChild = findRecursive(childNodes, node.id);
          if (foundInChild.length > 0) {
            occurrences.push(node, ...foundInChild);
            return occurrences;
          }
        }
      }
      return occurrences;
    }
    for (const key in tree) {
      const nodes = tree[key];
      const found = findRecursive(nodes);
      if (found.length > 0) {
        result.push(...found);
        return result;
      }
    }
    return result;
  }
  const item = {
    rows: [{ id: 0, parent_id: null }, { id: 3, parent_id: 2 }],
    cols: [{ id: 1, parent_id: 0 }, { id: 2, parent_id: 0 }, { id: 4, parent_id: 3 }],
    elements: [{ id: 5, parent_id: 4 }, { id: 5, parent_id: 1 }]
  };
  const tree: NestedObject = item;
  const targetId = 5;
  const occurrences = findAllOccurrences(tree, targetId);
  console.log(occurrences);