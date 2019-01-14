process.stdin.resume();
process.stdin.setEncoding('utf8');

var lines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


reader.on('line', (line) => {
  //console.log(line);
  run(line);
  //lines.push(line);
});
reader.on('close', () => {
    //console.log(lines);
    //lines.forEach((line) => {
    //    if (line.slice(0, 1) != "#") {
    //        run(line);
    //    }
    //});
});

class Node {
    constructor(val) {
        this.value = parseInt(val);
        this.right = null;
        this.left = null;
        this.height = 1;
    }
    
    addChild(val) {
        let lHeight = this.left === null ? 0 : this.left.height;
        let rHeight = this.right === null ? 0 : this.right.height;
        if (val < this.value) {
            if (this.left === null) {
                this.left = new Node(val);
                lHeight = 1;
            } else {
                lHeight = this.left.addChild(val);
            }
        } else {
            if (this.right === null) {
                this.right = new Node(val);
                rHeight = 1;
            } else {
              rHeight = this.right.addChild(val);
            }
        }
        if (lHeight >= rHeight + 2) {
          this.rotationL();
        } else if (rHeight >= lHeight + 2) {
          this.rotationR();
        } else {
          this.height = (lHeight > rHeight ? lHeight : rHeight) + 1;
        }
        return this.height;
    }

    updateHeight() {
      let lHeight = this.left === null ? 0 : this.left.height;
      let rHeight = this.right === null ? 0 : this.right.height;
      this.height = (lHeight > rHeight ? lHeight : rHeight) + 1;
    }

    rotationL() {
      let pivot = this.left;
      let thisValue = this.value;
      this.value = pivot.value;
      this.left = pivot.left;
      pivot.left = pivot.right;
      pivot.right = this.right;
      pivot.value = thisValue;
      this.right = pivot;
      pivot.updateHeight();
      this.updateHeight();
    }

    rotationR() {
      let pivot = this.right;
      let thisValue = this.value;
      this.value = pivot.value;
      this.right = pivot.right;
      pivot.right = pivot.left;
      pivot.left = this.left;
      pivot.value = thisValue;
      this.left = pivot;
      pivot.updateHeight();
      this.updateHeight();
    }
    
    toString() {
        let lString = this.left === null ? "" : this.left.toString();
        let rString = this.right === null ? "" : this.right.toString();
        return `[${lString} ${this.value} ${rString}]`;
    }
}

var run = (datas) => {
    let dSplit = datas.split(" ");
    let root = new Node(dSplit[0]);
    if (dSplit.length <= 1) return;
    for (let i = 1; i < dSplit.length; i++) {
        root.addChild(dSplit[i]);
    }
    console.log(root.toString());
};
