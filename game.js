arr = [];

cubesCount = 100;

size = window.innerHeight / cubesCount;

// 0 = empty
// 1 = wall
// 2 = maby
// 3 = solid empty

for (i = 0; i < cubesCount; i++) {
  arr.push([]);
  for (j = 0; j < cubesCount; j++) {
    arr[i].push(0);
    if (i == 0) {
      arr[i][j] = 1;
    }
    if (j == 0) {
      arr[i][j] = 1;
    }
    if (i == cubesCount - 1) {
      arr[i][j] = 1;
    }
    if (j == cubesCount - 1) {
      arr[i][j] = 1;
    }
  }
}

pointer = { x: 1, y: 1 };
mabyarr = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];
paused = false;
pausedTimer = 30;

pathArr = [];
for (i = 0; i < arr.length; i++) {
  pathArr.push([]);
  for (j = 0; j < arr[i].length; j++) {
    pathArr[i].push({ c: arr[i][j], path: [] });
  }
}

function draw() {
  if (!paused) {
    for (i = 0; i < arr.length; i++) {
      for (j = 0; j < arr[i].length; j++) {
        if (arr[i][j] == 0) {
          context.fillStyle = "grey";
        }
        if (arr[i][j] == 1) {
          context.fillStyle = "black";
        }
        if (arr[i][j] == 3) {
          context.fillStyle = "white";
        }
        context.fillRect(i * size, j * size, size - 1, size - 1);
      }
    }
  } else {
    for (i = 0; i < pathArr.length; i++) {
      for (j = 0; j < pathArr[i].length; j++) {
        if (pathArr[i][j].c == 0) {
          context.fillStyle = "black";
        }
        if (pathArr[i][j].c == 1) {
          context.fillStyle = "black";
        }
        if (pathArr[i][j].c == 3) {
          context.fillStyle = "white";
        }
        if (pathArr[i][j].c == 5) {
          context.fillStyle = "red";
        }
        context.fillRect(i * size, j * size, size - 1, size - 1);
      }
    }
  }
}

function update() {
  pausedTimer++;
  if (isKeyPressed[32] && pausedTimer > 30) {
    paused = !paused;
    pausedTimer = 0;
  }
  if (!paused) {
    for(ii = 0; ii<5; ii++){
    if (mabyarr.length == 0) {
      newPointerX = Math.floor(Math.random() * (arr.length - 2) + 1);
      newPointerY = Math.floor(Math.random() * (arr.length - 2) + 1);

      checkempty = false;

      if (arr[newPointerX + 1][newPointerY] == 0) {
        checkempty = true;
      }
      if (arr[newPointerX - 1][newPointerY] == 0) {
        checkempty = true;
      }
      if (arr[newPointerX][newPointerY + 1] == 0) {
        checkempty = true;
      }
      if (arr[newPointerX][newPointerY - 1] == 0) {
        checkempty = true;
      }

      if (arr[newPointerX][newPointerY] == 1 && checkempty) {
        pointer = { x: newPointerX, y: newPointerY };
        if (arr[pointer.x + 1][pointer.y] == 0) {
          mabyarr.push({ x: pointer.x + 1, y: pointer.y });
        }
        if (arr[pointer.x - 1][pointer.y] == 0) {
          mabyarr.push({ x: pointer.x - 1, y: pointer.y });
        }
        if (arr[pointer.x][pointer.y + 1] == 0) {
          mabyarr.push({ x: pointer.x, y: pointer.y + 1 });
        }
        if (arr[pointer.x][pointer.y - 1] == 0) {
          mabyarr.push({ x: pointer.x, y: pointer.y - 1 });
        }
      }
    } else {
      arr[pointer.x][pointer.y] = 3;
      for (i = 0; i < mabyarr.length; i++) {
        arr[mabyarr[i].x][mabyarr[i].y] = 1;
      }

      randNextMove = Math.floor(Math.random() * mabyarr.length);
      pointer = mabyarr[randNextMove];
      arr[pointer.x][pointer.y] = 3;

      mabyarr = [];

      if (arr[pointer.x + 1][pointer.y] == 0) {
        mabyarr.push({ x: pointer.x + 1, y: pointer.y });
      }
      if (arr[pointer.x - 1][pointer.y] == 0) {
        mabyarr.push({ x: pointer.x - 1, y: pointer.y });
      }
      if (arr[pointer.x][pointer.y + 1] == 0) {
        mabyarr.push({ x: pointer.x, y: pointer.y + 1 });
      }
      if (arr[pointer.x][pointer.y - 1] == 0) {
        mabyarr.push({ x: pointer.x, y: pointer.y - 1 });
      }

      // if(arr[pointer.x + 1][pointer.y + 1] == 0){
      //   arr[pointer.x + 1][pointer.y + 1] = 0
      // }
      // if(arr[pointer.x - 1][pointer.y + 1] == 0){
      //   arr[pointer.x - 1][pointer.y + 1] = 0
      // }
      // if(arr[pointer.x + 1][pointer.y - 1] == 0){
      //   arr[pointer.x + 1][pointer.y - 1] = 0
      // }
      // if(arr[pointer.x - 1][pointer.y - 1] == 0){
      //   arr[pointer.x - 1][pointer.y - 1] = 0
      // }
    }
  }
  } else {
    start = { x: 1, y: 1 };
    me = { x: Math.floor(mouseX/size), y: Math.floor(mouseY/size) };
    pathArr = [];
    for (i = 0; i < arr.length; i++) {
      pathArr.push([]);
      for (j = 0; j < arr[i].length; j++) {
        pathArr[i].push({ c: arr[i][j], path: [] });
      }
    }

    pathArr[start.x][start.y].path = [{x:1, y:1}]

    for(z= 0; z < 200; z++){
      if(pathArr[me.x][me.y].path.length > 0){
        for(k=0; k<pathArr[me.x][me.y].path.length; k++){
          pathArr[pathArr[me.x][me.y].path[k].x][pathArr[me.x][me.y].path[k].y].c = 5
        }
      }else{
        for(x = 0; x < pathArr.length; x ++){
          for(y = 0; y < pathArr[x].length; y ++){
            if(pathArr[x][y].path.length > 0){
              if(pathArr[x+1][y].c == 3 && pathArr[x+1][y].path.length == 0){
                for(p=0; p < pathArr[x][y].path.length; p++){
                  pathArr[x+1][y].path.push(pathArr[x][y].path[p])
                }
                pathArr[x+1][y].path.push({x:x+1, y:y})
              }

              if(pathArr[x-1][y].c == 3 && pathArr[x-1][y].path.length == 0){
                for(p=0; p < pathArr[x][y].path.length; p++){
                  pathArr[x-1][y].path.push(pathArr[x][y].path[p])
                }
                pathArr[x-1][y].path.push({x:x-1, y:y})
              }

              if(pathArr[x][y+1].c == 3 && pathArr[x][y+1].path.length == 0){
                for(p=0; p < pathArr[x][y].path.length; p++){
                  pathArr[x][y+1].path.push(pathArr[x][y].path[p])
                }
                pathArr[x][y+1].path.push({x:x, y:y+1})
              }

              if(pathArr[x][y-1].c == 3 && pathArr[x][y-1].path.length == 0){
                for(p=0; p < pathArr[x][y].path.length; p++){
                  pathArr[x][y-1].path.push(pathArr[x][y].path[p])
                }
                pathArr[x][y-1].path.push({x:x, y:y-1})
              }
            }
          }
        }
      }
    }
  }
}
