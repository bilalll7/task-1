// create scroll navbar
const navbar = document.getElementById("navbar");

// console.log(navbar)

const scroll = () => {
  const y = scrollY;
  if (y > 0) {
    navbar.classList.add("active");
  } else {
    navbar.classList.remove("active");
  }
};

window.addEventListener("scroll", scroll);

// buat typingan
var Typer = function (element) {
  this.element = element;
  var delim = element.dataset.delim || ",";
  var words = element.dataset.words || "override these,sample typing";
  this.words = words.split(delim).filter((v) => v); // kata-kata tidak boleh kosong
  this.delay = element.dataset.delay || 200;
  this.loop = element.dataset.loop || "true";
  if (this.loop === "false") {
    this.loop = 1;
  }
  this.deleteDelay =
    element.dataset.deletedelay || element.dataset.deleteDelay || 800;

  this.progress = { word: 0, char: 0, building: true, looped: 0 };
  this.typing = true;
  // console.log(words)
  var colors = element.dataset.colors || "black";
  this.colors = colors.split(",");
  this.element.style.color = this.colors[0];
  this.colorIndex = 0;

  this.doTyping();
};

Typer.prototype.start = function () {
  if (!this.typing) {
    this.typing = true;
    this.doTyping();
  }
};
Typer.prototype.stop = function () {
  this.typing = false;
};
Typer.prototype.doTyping = function () {
  var e = this.element;
  var p = this.progress;
  var w = p.word;
  var c = p.char;
  var currentDisplay = [...this.words[w]].slice(0, c).join("");
  var atWordEnd;
  if (this.cursor) {
    this.cursor.element.style.opacity = "1";
    this.cursor.on = true;
    clearInterval(this.cursor.interval);
    this.cursor.interval = setInterval(
      () => this.cursor.updateBlinkState(),
      400
    );
  }
  e.innerHTML = currentDisplay;
  // console.log(p);
  if (p.building) {
    atWordEnd = p.char === this.words[w].length;
    if (atWordEnd) {
      p.building = false;
    } else {
      p.char += 1;
    }
  } else {
    if (p.char === 0) {
      p.building = true;
      p.word = (p.word + 1) % this.words.length;
      this.colorIndex = (this.colorIndex + 1) % this.colors.length;
      this.element.style.color = this.colors[this.colorIndex];
    } else {
      p.char -= 1;
    }
  }

  if (p.word === this.words.length - 1) {
    p.looped += 1;
  }

  if (!p.building && this.loop <= p.looped) {
    this.typing = false;
  }

  setTimeout(
    () => {
      if (this.typing) {
        this.doTyping();
      }
    },
    atWordEnd ? this.deleteDelay : this.delay
  );
};

var Cursor = function (element) {
  this.element = element;
  this.cursorDisplay =
    element.dataset.cursordisplay || element.dataset.cursorDisplay || "_";
  element.innerHTML = this.cursorDisplay;
  this.on = true;
  element.style.transition = "all 0.1s";
  this.interval = setInterval(() => this.updateBlinkState(), 400);
};
Cursor.prototype.updateBlinkState = function () {
  if (this.on) {
    this.element.style.opacity = "0";
    this.on = false;
  } else {
    this.element.style.opacity = "1";
    this.on = true;
  }
};

function TyperSetup() {
  var typers = {};
  for (let e of document.getElementsByClassName("typer")) {
    // console.log(typers)
    typers[e.id] = new Typer(e);
  }
  for (let e of document.getElementsByClassName("typer-stop")) {
    let owner = typers[e.dataset.owner];
    e.onclick = () => owner.stop();
  }
  for (let e of document.getElementsByClassName("typer-start")) {
    let owner = typers[e.dataset.owner];
    e.onclick = () => owner.start();
  }
  for (let e of document.getElementsByClassName("cursor")) {
    let t = new Cursor(e);
    t.owner = typers[e.dataset.owner];
    t.owner.cursor = t;
  }
}

TyperSetup();
// akhir type

// adding funtionality to back to top button

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// Saat user scroll ke bawah 20 px dari navbar, tampilkan buttonnya
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// disaat user mengklik tombol, scroll ke bagian atas dokumen
mybutton.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

// Buat Navbar Mobile
const menu_btn = document.querySelector(".hamburger");
const mobile_menu = document.querySelector(".mobile-nav");

menu_btn.addEventListener("click", function () {
  menu_btn.classList.toggle("is-active");
  mobile_menu.classList.toggle("is-active");
});
