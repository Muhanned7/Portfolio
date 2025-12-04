class Node{
    constructor(val){
        this.left = null
        this.val = val;
        this.right = null;
    }
}
/*Build a Tree class/factory which accepts an array when initialized. The Tree class should have a root attribute, which uses the return value of buildTree which you’ll write next.*/
class Tree{
    constructor(arr){
        this.arr = [...new Set(arr)].sort((a, b) => a - b);
        this.root = null;
        this.arr = this.arr.map(item=>new Node(item));
    }
    /*Write a buildTree(array) function that takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.*/
    buildTree(array){
        console.log(array.map(item=>item.val))
        if (array.length<=1){
            if (array.length==1){
                return new Node(array[0].val)
            }
            else{
                return null
             } 
        }
        
        let mid = Math.floor((array.length)/2)
        array[mid].left = this.buildTree(array.slice(0,mid));
        array[mid].right = this.buildTree(array.slice(mid+1));
        this.arr = array
        return array[mid]
    }
}

let local_tree = new Tree([3,1,2,4])
local_tree.buildTree(local_tree.arr)
console.log(local_tree.arr)
