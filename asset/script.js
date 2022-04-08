var go = 0;
var sc = 0;
var pX = 0;
var pY = 0;
var mX = 0;
var mY = 0;
var X = 0;
var Y = 0;
var c = [];
var hit_5 = [];
var count = 0;
function run() {
  document.getElementById("abs").style.display = "none";
  document.getElementsByClassName("p5Canvas")[0].style.display = "block";
  go = 1;
  document.getElementById("ctr").innerHTML = "<div id='temp'>"+sc+"</div>";
  setTimeout(chg, 1000);
}
function chg() {
  if (go == 1) {
    sc += 1;
    document.getElementById("ctr").innerHTML = "<div id='temp'>"+sc+"</div>";
    setTimeout(chg, 1000);
  }
}
function end() {
  go = 0;
  setCookie("sc", sc.toString(), 365);
  location.reload();
}
function rdm() {
  if (count == 0) {
    r_1 = random(["x", "y"]);
    r_2 = random([5, 515]);
    r_3 = random(5, 516);
    if (r_1 == "x") {
      c.push(r_2);
	  c.push(r_3);
    } else if (r_1 == "y") {
      c.push(r_3);
	  c.push(r_2);
    }
    
	count += 1;
  } else if (count == 60) {
    count = 0;
  } else {
    count += 1;
  }
  for (i=0; i<c.length; i=i+2) {
    stroke("#ff0000");
    fill("#ff0000");
    circle(c[i], c[i+1], 10);
  }
  for (i=0; i<c.length; i=i+2) {
    tX = (c[i] - pX)/Math.sqrt(Math.pow((c[i] - pX), 2)+Math.pow((c[i+1] - pY), 2));
    tY = (c[i+1] - pY)/Math.sqrt(Math.pow((c[i] - pX), 2)+Math.pow((c[i+1] - pY), 2));
    c[i] -= tX;
    c[i+1] -= tY;
  }
}
function chkHit() {
  for (i=0; i<hit_5.length; i+=1) {
    if (hit_5[i] == true) {
	  end();
	}
  }
}
function setup() {
  createCanvas(520, 520);
  player = [createVector(270, 270), createVector(260, 260), createVector(265, 255), createVector(270, 260), createVector(275, 255), createVector(280, 260)];
  border_top = [createVector(10, 10), createVector(510, 10), createVector(510, 10), createVector(10, 10)];
  border_bot = [createVector(10, 510), createVector(510, 510), createVector(510, 510), createVector(10, 510)];
  border_lft = [createVector(10, 10), createVector(10, 510), createVector(10, 510), createVector(10, 10)];
  border_rft = [createVector(510, 10), createVector(510, 510), createVector(510, 510), createVector(510, 10)];
  X = 250;
  Y = 250;
}
function draw() {
  background(255);
  if (go == 1) {
    pX = player[0].x;
    pY = player[0].y;
	mX = (X - pX)*1.5/Math.sqrt(Math.pow((X - pX), 2)+Math.pow((Y - pY), 2));
	mY = (Y - pY)*1.5/Math.sqrt(Math.pow((X - pX), 2)+Math.pow((Y - pY), 2));
	player = [createVector(player[0].x + mX, player[0].y + mY), createVector(player[1].x + mX, player[1].y + mY), createVector(player[2].x + mX, player[2].y + mY), createVector(player[3].x + mX, player[3].y + mY), createVector(player[4].x + mX, player[4].y + mY), createVector(player[5].x + mX, player[5].y + mY)];
	stroke("#000");
	fill("#000");
	beginShape();
	for (const { x, y } of player)  vertex(x, y);
	endShape(CLOSE);
	stroke("#ff0000");
	beginShape();
	for (const { x, y } of border_top)  vertex(x, y);
	endShape(CLOSE);
	stroke("#ff0000");
	beginShape();
	for (const { x, y } of border_bot)  vertex(x, y);
	endShape(CLOSE);
	stroke("#ff0000");
	beginShape();
	for (const { x, y } of border_lft)  vertex(x, y);
	endShape(CLOSE);
	stroke("#ff0000");
	beginShape();
	for (const { x, y } of border_rft)  vertex(x, y);
	endShape(CLOSE);
	hit_1 = collidePolyPoly(player, border_top, true);
	hit_2 = collidePolyPoly(player, border_bot, true);
	hit_3 = collidePolyPoly(player, border_lft, true);
	hit_4 = collidePolyPoly(player, border_rft, true);
	for (i=0; i<c.length; i=i+2) {
	  hit_5.push(collideCirclePoly(c[i], c[i+1], 10, player, true));
	}
	chkHit();
	if (hit_1 == true) {
	  end();
	} else if (hit_2 == true) {
	  end();
	} else if (hit_3 == true) {
	  end();
	} else if (hit_4 == true) {
	  end();
	}
	rdm();
  }
}
function mouseClicked() {
  if (go == 1) {
    X = mouseX;
	Y = mouseY;
  }
}