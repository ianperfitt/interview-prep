const groups = [
['Arrays & Hashing','Contains Duplicate|Valid Anagram|Two Sum|Group Anagrams|Top K Frequent Elements|Encode and Decode Strings|Product of Array Except Self|Valid Sudoku|Longest Consecutive Sequence'],
['Two Pointers','Valid Palindrome|Two Sum II - Input Array Is Sorted|3Sum|Container With Most Water|Trapping Rain Water'],
['Sliding Window','Best Time to Buy and Sell Stock|Longest Substring Without Repeating Characters|Longest Repeating Character Replacement|Permutation in String|Minimum Window Substring|Sliding Window Maximum'],
['Stack','Valid Parentheses|Min Stack|Evaluate Reverse Polish Notation|Generate Parentheses|Daily Temperatures|Car Fleet|Largest Rectangle in Histogram'],
['Binary Search','Binary Search|Search a 2D Matrix|Koko Eating Bananas|Find Minimum in Rotated Sorted Array|Search in Rotated Sorted Array|Time Based Key-Value Store|Median of Two Sorted Arrays'],
['Linked List','Reverse Linked List|Merge Two Sorted Lists|Reorder List|Remove Nth Node From End of List|Copy List with Random Pointer|Add Two Numbers|Linked List Cycle|Find the Duplicate Number|LRU Cache|Merge k Sorted Lists|Reverse Nodes in k-Group'],
['Trees','Invert Binary Tree|Maximum Depth of Binary Tree|Diameter of Binary Tree|Balanced Binary Tree|Same Tree|Subtree of Another Tree|Lowest Common Ancestor of a Binary Search Tree|Binary Tree Level Order Traversal|Binary Tree Right Side View|Count Good Nodes in Binary Tree|Validate Binary Search Tree|Kth Smallest Element in a BST|Construct Binary Tree from Preorder and Inorder Traversal|Binary Tree Maximum Path Sum|Serialize and Deserialize Binary Tree'],
['Tries','Implement Trie (Prefix Tree)|Design Add and Search Words Data Structure|Word Search II'],
['Heap / Priority Queue','Kth Largest Element in a Stream|Last Stone Weight|K Closest Points to Origin|Kth Largest Element in an Array|Task Scheduler|Design Twitter|Find Median from Data Stream'],
['Backtracking','Subsets|Combination Sum|Permutations|Subsets II|Combination Sum II|Word Search|Palindrome Partitioning|Letter Combinations of a Phone Number|N-Queens'],
['Graphs','Number of Islands|Clone Graph|Max Area of Island|Pacific Atlantic Water Flow|Surrounded Regions|Rotting Oranges|Walls and Gates|Course Schedule|Course Schedule II|Redundant Connection|Number of Connected Components in an Undirected Graph|Graph Valid Tree|Word Ladder'],
['Advanced Graphs','Reconstruct Itinerary|Min Cost to Connect All Points|Network Delay Time|Swim in Rising Water|Alien Dictionary|Cheapest Flights Within K Stops'],
['1-D Dynamic Programming','Climbing Stairs|Min Cost Climbing Stairs|House Robber|House Robber II|Longest Palindromic Substring|Palindromic Substrings|Decode Ways|Coin Change|Maximum Product Subarray|Word Break|Longest Increasing Subsequence|Partition Equal Subset Sum'],
['2-D Dynamic Programming','Unique Paths|Longest Common Subsequence|Best Time to Buy and Sell Stock with Cooldown|Coin Change II|Target Sum|Interleaving String|Longest Increasing Path in a Matrix|Distinct Subsequences|Edit Distance|Burst Balloons|Regular Expression Matching'],
['Greedy','Maximum Subarray|Jump Game|Jump Game II|Gas Station|Hand of Straights|Merge Triplets to Form Target Triplet|Partition Labels|Valid Parenthesis String'],
['Intervals','Insert Interval|Merge Intervals|Non-overlapping Intervals|Meeting Rooms|Meeting Rooms II|Minimum Interval to Include Each Query'],
['Math & Geometry','Rotate Image|Spiral Matrix|Set Matrix Zeroes|Happy Number|Plus One|Pow(x, n)|Multiply Strings|Detect Squares'],
['Bit Manipulation','Single Number|Number of 1 Bits|Counting Bits|Reverse Bits|Missing Number|Sum of Two Integers|Reverse Integer']
];
export const weekData = [
['Arrays & hashing','Integrate resize() into add()','Trace a prior-authorization request through Next.js, Spring Boot and PostgreSQL.'],
['Prefix & suffix patterns','Implement get(index) and remove(index)','Compare SSG, ISR, SSR and CSR for a product detail page.'],
['Two pointers','Implement an in-place array reversal','Sketch REST contracts and validation for creating a linked authorization.'],
['Sliding window','Use HashMap.merge to maintain window counts','Design pagination and error responses for a searchable queue.'],
['Stacks','Implement a stack using ArrayDeque','Build a Spring Boot endpoint with controller and service tests.'],
['Binary search','Implement lower bound with a loop invariant','Compare PostgreSQL indexes with EXPLAIN on synthetic data.'],
['Linked list fundamentals','Implement list reversal and detect cycles','Draw a transaction boundary for updating linked records.'],
['Linked list design','Implement an LRU cache with a map and doubly linked list','Compare cache-aside with direct database reads.'],
['Tree traversal','Write recursive DFS and iterative BFS','Compare polling, SSE and WebSockets for status updates.'],
['Binary search trees','Validate a BST with bounds and test duplicates','Design an Elasticsearch mapping for search and filters.'],
['Tree construction & tries','Implement a trie and round-trip a serialized tree','Sketch a Next.js search UX with URL state and server data.'],
['Heap fundamentals','Use PriorityQueue with a safe comparator','Define async job retries and idempotency keys.'],
['Heaps & backtracking','Implement a bounded top-k queue','Design egress rate limiting and backpressure for a worker.'],
['Backtracking templates','Write a choose/explore/unchoose template','Draft STAR stories for ownership and a difficult bug.'],
['Graph traversal','Implement grid BFS with an ArrayDeque','Design a notification service with retries and dead-letter handling.'],
['Directed graphs','Implement topological sort and detect cycles','Compare synchronous calls and event-driven workflows.'],
['Connectivity','Implement union-find with path compression','Design a read-heavy API with caches and read replicas.'],
['Weighted graphs','Implement Dijkstra with stale-entry checks','Sketch a URL shortener with requirements and capacity estimates.'],
['1-D DP basics','Convert memoization to tabulation','Define latency, availability and correctness targets for search.'],
['1-D DP states','Explain and test transition and base cases','Design a versioned API and plan a safe database migration.'],
['2-D DP basics','Implement grid DP and a rolling array','Design a file upload service with object storage.'],
['2-D DP strings','Implement edit distance with boundary tests','Compare consistency choices for an inventory service.'],
['Greedy foundations','Write invariant and counterexample tests','Design permissions, audit trails and access checks for a workflow.'],
['Greedy & intervals','Sort intervals with a Comparator','Design appointment scheduling and prevent double booking.'],
['Interval scheduling','Implement sweep-line tie breaking','Design a calendar with recurring events and conflict detection.'],
['Matrix & number patterns','Implement in-place matrix rotation','Walk through an incident using logs, metrics and traces.'],
['Bit manipulation','Trace shifts and integer overflow in Java','Rehearse a full-stack project deep dive with trade-offs.'],
['Mixed-pattern review','Redo a weak problem without reference code','Mock a 45-minute system design and log feedback.'],
['Timed coding pairs','Write tests aloud before coding','Practice two STAR stories with measurable outcomes.'],
['Graph & DP review','Redo two weak graph/DP problems from memory','Design a feed and explain fan-out and caching.'],
['Full mock loop','Run a timed Java coding mock','Run coding, design and behavioral rounds separately.'],
['Targeted remediation','Redo missed mock problems after a delay','Repeat the weakest design or behavioral round.'],
['Interview rehearsal','Practice clean Java with no IDE assistance','Rehearse a project deep dive and evaluate readiness by round.'],
['Final review & applications','Explain three patterns and edge cases aloud','Review company-specific roles, stories and interview logistics.']
];
const topicWeeks = [[1,2],[3],[4],[5],[6],[7,8],[9,10,11],[11],[12,13],[13,14],[15,16,17],[18],[19,20],[21,22],[23,24],[24,25],[26],[27]];
export type Problem = {topic:string; name:string; week:number; id:string};
export const problems: Problem[] = groups.flatMap(([topic,list],group) => {
  const names=list.split('|');
  const weeks=topicWeeks[group];
  return names.map((name,index)=>({topic,name,week:weeks[Math.floor(index*weeks.length/names.length)],id:`p-${group}-${index}`}));
});
